import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ShortFile } from '../../../../../../backend/src/models/short-file.model';
import { DialogService } from '../../../services/dialog.service';
import { FileService } from '../../../services/items/file.service';


@Component({
    selector: 'app-files-list',
    templateUrl: './files-list.component.html',
    styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit, OnDestroy {
    allFiles: ShortFile[];

    private subscriptions: Subscription[] = [];

    constructor(private readonly fileService: FileService, private readonly dialogService: DialogService) {
        this.subscriptions.push(
            fileService.files.subscribe(files => {
                this.allFiles = files;
            })
        );
    }

    handleFileInput(files: FileList) {
        this.fileService.create(
            files.item(0),
            'Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung. Eine etwas längere Beschreibung.Eine etwas längere Beschreibung. Eine etwas längere Beschreibung. Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.Eine etwas längere Beschreibung.'
        );
    }

    downloadFile(refrence: ShortFile) {
        this.fileService.download(refrence);
    }

    getDate(date: number) {
        const realDate = new Date();
        realDate.setTime(date);
        return `${realDate.getDay()}.${realDate.getMonth() + 1}.${realDate.getFullYear()}`;
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

    ngOnInit() {
        this.fileService.get();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe);
    }
}
