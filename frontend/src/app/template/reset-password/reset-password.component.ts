import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { routePaths } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, private readonly authService: AuthenticationService, private readonly router: Router) {}

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    error: string;

    loginFormGroup = new FormGroup({
        email: this.emailFormControl
    });

    reset() {
        this.error = '';
        this.authService.sendRecoveryEmail(this.emailFormControl.value).subscribe(result => {
            if(result.successful) {
                this.dialogRef.afterClosed().pipe(first()).subscribe(() => {
                    this.router.navigate([routePaths.RESET_PASSWORD])
                })
                this.dialogRef.close();
            } else {
                this.error = result.errorMessage;
            }
        })
    }

    dismiss() {
        this.dialogRef.close(false);
    }
}
