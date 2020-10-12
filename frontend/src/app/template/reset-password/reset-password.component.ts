import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { DialogService } from 'src/app/services/dialog.service';


@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, private readonly dialogService: DialogService) {}

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    loginFormGroup = new FormGroup({
        email: this.emailFormControl,
        password: this.passwordFormControl
    });

    reset() {
        // TODO: Send API request to send email
        this.dialogRef.close({ email: this.emailFormControl.value, password: this.passwordFormControl.value });
    }

    dismiss() {
        this.dialogRef.close(false);
    }
}
