import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginTemplateComponent } from 'src/app/template/login/login-template.component';


@Component({
    selector: 'igs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User;

    constructor(private readonly authService: AuthenticationService, private readonly dialogService: DialogService) {}

    ngOnInit(): void {
        this.authService.user.subscribe(user => (this.user = user));
    }

    login() {
        this.dialogService.openDialog(LoginTemplateComponent);
    }

    logout() {
        this.authService.logout();
        this.dialogService.flashSuccess('Sie wurden erfolgreich ausgeloggt.');
    }
}
