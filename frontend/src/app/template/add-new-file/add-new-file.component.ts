import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { first } from 'rxjs/operators';
import { FileScope } from 'src/app/backend-datatypes/short-file.model';
import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { DialogService } from '../../services/dialog.service';
import { FileService } from '../../services/items/file.service';


@Component({
    templateUrl: './add-new-file.component.html',
    styleUrls: ['./add-new-file.component.scss']
})
export class AddNewFileComponent implements OnInit {
    user: User;
    currentFile: File;
    description = '';
    fileScopeRegions: FileScope[];

    readonly fileScopeEnum = FileScope;

    private _fileScope: FileScope;

    public get fileScope() {
        return this._fileScope;
    }
    public set fileScope(value) {
        this._fileScope = value;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<AddNewFileComponent>,
        private fileService: FileService,
        private dialogService: DialogService,
        private authSerivce: AuthenticationService
    ) {
        authSerivce.user.pipe(first()).subscribe(user => {
            this.user = user;
            this.fileScope = user.regionalgruppe as any;
            if (user.isSuperUser) {
                this.fileScope = FileScope.general;
            }
        });

        this.fileScopeRegions = Object.entries(FileScope).map(KeyValue => KeyValue[1]);
    }

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
        this.fileService.create(this.currentFile, this.description, this.fileScope).subscribe(success => {
            if (success) {
                this.dialogService.flashSuccess('Die Datei wurde erfolgreich hochgeladen.');
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
