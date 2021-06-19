import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { from, Subject, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SuperuserService } from 'src/app/services/superuser.service';
import { AddNewUserComponent } from 'src/app/template/add-new-user/add-new-user.component';


@Component({
    selector: 'app-files-list',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class UsermanagementComponent implements OnDestroy, AfterViewInit {
    allUsers: User[] = [];
    displayedColumns: string[] = ['select', 'id', 'name', 'username', 'email', 'regionalgruppe', 'isSuperUser', 'action'];
    dataSource: MatTableDataSource<User> = new MatTableDataSource([]);
    selection = new SelectionModel<User>(true, []);
    isMasterToggleOn = false;

    private _searchTerm = '';
    private subscriptions: Subscription[] = [];
    private searchTermChange = new Subject<string>();

    userSelf: User;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public get searchTerm(): string {
        return this._searchTerm;
    }

    public set searchTerm(searchTerm: string) {
        this._searchTerm = searchTerm;
        this.searchTermChange.next(searchTerm);
        this.applyFilter(searchTerm);
    }

    private applyFilter(searchTerm: string) {
        this.dataSource.filter = searchTerm.trim().toLowerCase();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(
        private readonly superuserService: SuperuserService,
        private readonly dialogService: DialogService,
        private readonly authService: AuthenticationService
    ) {
        this.subscriptions.push(
            superuserService.getListOfUsers().subscribe(users => {
                this.refresh();
            })
        );

        this.subscriptions.push(
            this.authService.user.subscribe(user => {
                this.userSelf = user;
            })
        );
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isMasterToggleOn) {
            this.selection.clear();
            this.isMasterToggleOn = false;
            return;
        } else {
            this.isMasterToggleOn = true;
            this.selection.select(...this.dataSource.filteredData.filter(user => user.id !== this.userSelf.id));
        }
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    removeUser(refrence: User) {
        this.dialogService
            .confirm(`Sind Sie sich sicher, den Benutzer "${refrence.name}" zu löschen?`, 'Benutzer Löschen')
            .afterClosed()
            .subscribe(confirmation => {
                if (confirmation) {
                    this.superuserService.deleteUser(refrence).subscribe(res => {
                        if (res.successful) {
                            this.dialogService.flashSuccess('Der Benutzer wurde erfolgreich gelöscht');
                            this.refresh();
                        } else {
                            this.dialogService.flashError('Leider konnte der Benutzer nicht gelöscht werden: ' + res.errorMessage);
                        }
                    });
                }
            });
    }

    deleteList() {
        const list = this.selection.selected;
        this.dialogService
            .confirm(`Sind Sie sich sicher, die ${list.length} Benutzer "${list.map(user => user.name).join(', ')}" zu löschen?`, `${list.length} Benutzer Löschen`)
            .afterClosed()
            .subscribe(confirmation => {
                if (confirmation) {
                    from(list)
                        .pipe(switchMap(user => this.superuserService.deleteUser(user)))
                        .subscribe(success => {
                            if (success) {
                                this.dialogService.flashSuccess('Die Benutzer wurden erfolgreich gelöscht.');
                                this.refresh
                            } else {
                                this.dialogService.flashError('Die Benutzer konnten nicht gelöscht werden. Versuchen Sie es später noch einmal!');
                            }
                        });
                }
            });
    }

    refresh() {
        this.superuserService.getListOfUsers().subscribe(users => {
            this.selection.clear();
            this.isMasterToggleOn = false;
            this.allUsers = users;
            this.dataSource.data = this.allUsers;
        });
    }

    openNewUserDialogue() {
        this.dialogService
            .openDialog(AddNewUserComponent, {})
            .afterClosed()
            .pipe(filter(res => res))
            .subscribe(() => {
                this.refresh();
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe);
    }
}
