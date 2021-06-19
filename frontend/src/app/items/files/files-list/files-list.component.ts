import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { from, Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FileScope } from 'src/app/backend-datatypes/short-file.model';
import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ShortFile } from '../../../../../../backend/src/models/short-file.model';
import { DialogService } from '../../../services/dialog.service';
import { FileService } from '../../../services/items/file.service';
import { getIconFromMimetype } from '../../../shared/icons';
import { AddNewFileComponent } from '../../../template/add-new-file/add-new-file.component';


@Component({
    selector: 'app-files-list',
    templateUrl: './files-list.component.html',
    styleUrls: ['./files-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class FilesListComponent implements OnInit, OnDestroy, AfterViewInit {
    allFiles: ShortFile[];
    expandedElement: ShortFile | null;
    displayedColumns: string[] = ['select', 'type', 'name', 'creationDate', 'author', 'regionalgruppe', 'action'];
    dataSource: MatTableDataSource<ShortFile> = new MatTableDataSource([]);
    selection = new SelectionModel<ShortFile>(true, []);
    isMasterToggleOn = false;

    private _searchTerm = '';
    private subscriptions: Subscription[] = [];
    private searchTermChange = new Subject<string>();

    private user: User;

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

    constructor(private readonly fileService: FileService, private readonly dialogService: DialogService, private readonly authService: AuthenticationService) {
        // TODO: Better observables and better search engine
        this.subscriptions.push(
            fileService.files.subscribe(files => {

                this.selection.clear();
                this.isMasterToggleOn = false;

                this.allFiles = files;

                if (this.user && !this.user.isSuperUser) {
                    this.allFiles = files.filter(file => {
                        if (file.scope == FileScope.general) {
                            return true;
                        } else {
                            return file.scope == (this.user.regionalgruppe as any);
                        }
                    });
                }

                this.dataSource.data = this.allFiles;
            })
        );
        this.subscriptions.push(
            this.authService.user.subscribe(user => {
                this.user = user;
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
            this.selection.select(...this.dataSource.filteredData);
        }
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ShortFile): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    downloadFile(refrence: ShortFile) {
        if (refrence) {
            this.fileService.download(refrence);
        }
    }

    downloadList() {
        const list = this.selection.selected;
        from(list)
            .pipe(tap(file => this.fileService.download(file)))
            .subscribe();
    }

    getDate(date: number) {
        const realDate = new Date();
        realDate.setTime(date);

        const addZeros = (d: number) => {
            return d.toString().split('').length === 1 ? '0' + d : d;
        };

        return `${addZeros(realDate.getDate())}.${addZeros(realDate.getMonth() + 1)}.${realDate.getFullYear()} - ${addZeros(realDate.getHours())}:${addZeros(
            realDate.getMinutes()
        )}`;
    }

    realName(fileName: string) {
        return fileName.split('.')[0];
    }

    removeFile(refrence: ShortFile) {
        this.dialogService
            .confirm(`Sind Sie sich sicher, die Datei "${refrence.name}" zu löschen?`, 'Datei Löschen')
            .afterClosed()
            .subscribe(confirmation => {
                if (confirmation) {
                    this.fileService.remove(refrence).subscribe(success => {
                        if (success) {
                            this.dialogService.flashSuccess('Die Datei wurde erfolgreich gelöscht.');
                        } else {
                            this.dialogService.flashError('Die Datei konnte nicht gelöscht werden. Versuchen Sie es später noch einmal!');
                        }
                    });
                }
            });
    }

    deleteList() {
        const list = this.selection.selected;

        this.dialogService
            .confirm(`Sind Sie sich sicher, die ${list.length} Dateien "${list.map(file => file.name).join(', ')}" zu löschen?`, `${list.length} Dateien Löschen`)
            .afterClosed()
            .subscribe(confirmation => {
                if (confirmation) {
                    from(list)
                        .pipe(switchMap(file => this.fileService.remove(file)))
                        .subscribe(success => {
                            if (success) {
                                this.dialogService.flashSuccess('Die Dateien wurde erfolgreich gelöscht.');
                                this.fileService.get();
                            } else {
                                this.dialogService.flashError('Die Dateien konnte nicht gelöscht werden. Versuchen Sie es später noch einmal!');
                            }
                        });
                }
            });
    }

    /** Return true if the user is the author of the refrenced file or is a superuser */
    hasFileAccess(file: ShortFile): boolean {
        return (this.user && file.authorId && file.authorId === Number(this.user.id)) || (this.user && this.user.isSuperUser);
    }

    getIconName(mimetype: string) {
        return getIconFromMimetype(mimetype);
    }

    openNewFileDialogue() {
        this.dialogService.openDialog(AddNewFileComponent, {});
    }

    ngOnInit() {
        this.fileService.get();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe);
    }
}
