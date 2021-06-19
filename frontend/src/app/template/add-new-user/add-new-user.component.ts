import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Regionalgruppe, User } from 'src/app/backend-datatypes/user.model';
import { DialogService } from 'src/app/services/dialog.service';
import { SuperuserService } from 'src/app/services/superuser.service';


@Component({
    templateUrl: './add-new-user.component.html',
    styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
    name: string;
    username: string;
    password: string;
    email: string;
    regionalgroup: Regionalgruppe;
    isSuperUser: boolean;

    regionalgroupEntries: Regionalgruppe[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<AddNewUserComponent>,
        private readonly superuserService: SuperuserService,
        private readonly dialogService: DialogService
    ) {
        this.regionalgroupEntries = Object.entries(Regionalgruppe).map(value => value[1]);
    }

    confirm(result: boolean) {
        this.dialogRef.close(result);
    }

    ngOnInit(): void {}

    createUser() {
        const newUser = new User(this.username, this.email, null, this.isSuperUser, this.name, this.regionalgroup);
        this.superuserService.createUser({...newUser, password: this.password}).subscribe(res => {
            if (res.successful) {
                this.dialogService.flashSuccess('Der Benutzer wurde erfolgreich erstellt');
            } else {
                this.dialogService.flashError('Leider konnte der Benutzer nicht erstellt werden: ' + res.errorMessage);
            }
            this.dialogRef.close(res.successful)
        });
    }
}
