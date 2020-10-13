import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
    constructor(private readonly authService: AuthenticationService, private readonly router: Router,
        private readonly dialogService: DialogService) {}

    recoveryKeyFormControl = new FormControl('', [Validators.required, Validators.minLength(20)]);
    passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

    error: string;
    hide = true;

    loginFormGroup = new FormGroup({
        key: this.recoveryKeyFormControl,
        password: this.passwordFormControl
    });

    changePassword() {
        this.error = '';
        this.authService.resetPassword(this.recoveryKeyFormControl.value, this.passwordFormControl.value).subscribe(result => {
            if (result.successful) {
                this.router.navigate(['']);
                this.dialogService.flashSuccess('Passwort wurde erfolgreich geändert!');
            } else {
                this.error = result.errorMessage;
            }
        });
    }
}
