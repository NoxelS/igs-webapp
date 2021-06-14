import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogService } from '../../services/dialog.service';
import { FileService } from '../../services/items/file.service';


@Component({
    templateUrl: './add-new-file.component.html',
    styleUrls: ['./add-new-file.component.scss']
})
export class AddNewFileComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<AddNewFileComponent>,
        private fileService: FileService,
        private dialogService: DialogService
    ) {}

    currentFile: File;
    description = '';

    confirm(result: boolean) {
        this.dialogRef.close(result);
    }

    ngOnInit(): void {}

    handleFileInput(files: FileList) {
        if (files) {
            this.currentFile = files.item(0);
        }

        if (files.length > 1) {
            this.dialogService.flashError('Leider ist es zurzeit nicht möglich, mehr als eine Datei gleichzeitig hochzuladen.');
        }
    }

    uploadFile() {
        this.fileService.create(this.currentFile, this.description).subscribe(success => {
            if (success) {
                this.dialogService.displayNotification('Die Datei wurde erfolgreich hochgeladen.');
            } else {
                this.dialogService.flashError('Leider konnte die Datei nicht hochgeladen werden. Bitte versuchen Sie es später erneut.');
            }
            this.confirm(success);
        });
    }

    get fileSize(): string {
        return this.currentFile ? (Math.round((100 * this.currentFile.size) / 1000000) / 100).toString() : '0';
    }
}
