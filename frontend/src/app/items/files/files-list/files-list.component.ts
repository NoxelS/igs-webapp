import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subject, Subscription } from 'rxjs';

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
    displayedColumns: string[] = ['type', 'name', 'creationDate', 'author', 'action'];
    dataSource: MatTableDataSource<ShortFile> = new MatTableDataSource([]);

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

    private _searchTerm = '';
    private subscriptions: Subscription[] = [];
    private searchTermChange = new Subject<string>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(private readonly fileService: FileService, private readonly dialogService: DialogService) {
        // TODO: Better observables and better search engine
        this.subscriptions.push(
            fileService.files.subscribe(files => {
                this.allFiles = files;
                this.dataSource.data = files;
            })
        );
    }

    handleFileInput(files: FileList) {
        if (files) {
            this.fileService.create(
                files.item(0),
                'Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung. Eine etwas längere Beschreibung.Eine etwas längere Beschreibung. Eine etwas längere Beschreibung. Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.'
            );
        }
    }

    downloadFile(refrence: ShortFile) {
        if (refrence) {
            this.fileService.download(refrence);
        }
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
