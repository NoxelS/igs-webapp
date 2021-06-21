import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginTemplateComponent } from 'src/app/template/login/login-template.component';


@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
    name: string;
    email: string;
    username: string;
    password: string;
    regionalgruppe: string;

    hide = true;

    private user: User;

    constructor(private readonly authService: AuthenticationService, private readonly dialogService: DialogService, private readonly router: Router) {
        authService.user.subscribe(user => {
            if (user) {
                this.name = user.name;
                this.username = user.username;
                this.email = user.email;
                this.regionalgruppe = user.regionalgruppe;
                this.user = user;
            }
        });
    }

    ngOnInit(): void {}

    changeUser() {
        this.dialogService
            .confirm('Sind Sie sich sicher, Ihr Profil zu ändern?', 'Profil Ändern')
            .afterClosed()
            .subscribe(confirm => {
                if (confirm) {
                    this.authService
                        .changeUser(new User(this.username, this.email, this.user.id, false, this.name, this.regionalgruppe as any))
                        .subscribe(res => {
                            if (res.successful) {
                                this.dialogService.flashSuccess('Der Benutzer wurde erfolgreich verändert.');
                                this.authService.updateUserInformation();
                            } else {
                                this.dialogService.flashError('Leider konnte der Benutzer nicht verändert werden.');
                            }
                        });
                }
            });
    }

    changePassword() {
        this.dialogService
            .confirm('Sind Sie sich sicher, Ihr Passwort zu ändern?', 'Passwort Ändern')
            .afterClosed()
            .subscribe(confirm => {
                if (confirm) {
                    this.authService.changePassword(this.user, this.password).subscribe(res => {
                        if (res.successful) {
                            this.dialogService.flashSuccess('Der Passwort wurde erfolgreich verändert. Sie müssen sich nun neu einloggen.');
                            this.router.navigateByUrl('');
                            this.dialogService.openDialog(LoginTemplateComponent);
                        } else {
                            this.dialogService.flashError('Leider konnte das Passwort nicht verändert werden.');
                        }
                    });
                }
            });
    }
}
