import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';

import { ResetPasswordComponent } from '../reset-password/reset-password.component';


@Component({
    templateUrl: './login-template.component.html',
    styleUrls: ['./login-template.component.scss']
})
export class LoginTemplateComponent {
    constructor(public dialogRef: MatDialogRef<LoginTemplateComponent>,
        private readonly dialogService: DialogService,
        private readonly authService: AuthenticationService) {}

    usernameFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
    loginFormGroup = new FormGroup({
        username: this.usernameFormControl,
        password: this.passwordFormControl
    });

    error: boolean;

    login() {
        this.authService.login(this.usernameFormControl.value, this.passwordFormControl.value).subscribe(response => {
            if(response.successful) {
                this.dialogRef.close();
                this.dialogService.flashSuccess('Sie haben sich erfolgreich angemeldet.')
            } else {
                this.error = true;
                this.passwordFormControl.setValue('');
                this.passwordFormControl.reset();
            }
        })
    }

    dismiss() {
        this.dialogRef.close(false);
    }

    forgotPassword() {
        this.dialogRef.close(false);
        this.dialogService.openDialog(ResetPasswordComponent)
    }
}
