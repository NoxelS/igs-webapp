import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';
import { routePaths } from 'src/app/shared/routes.const';
import { LoginTemplateComponent } from 'src/app/template/login/login-template.component';


@Component({
    selector: 'igs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User;

    readonly routes = routePaths;

    constructor(private readonly authService: AuthenticationService, private readonly dialogService: DialogService, private readonly router: Router) {}

    ngOnInit(): void {
        this.authService.user.subscribe(user => (this.user = user));
    }

    login() {
        this.dialogService.openDialog(LoginTemplateComponent);
    }

    logout() {
        this.dialogService
            .confirm('Möchten Sie sich wirklich ausloggen?', 'Ausloggen bestätigen')
            .afterClosed()
            .subscribe(confirmed => {
                if (confirmed) {
                    this.authService.logout();
                    this.dialogService.flashSuccess('Sie wurden erfolgreich ausgeloggt.');
                    this.router.navigateByUrl('/');
                }
            });
    }
}
