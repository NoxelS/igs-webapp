import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmTemplateComponent } from '../template/confirm-template/confirm-template.component';


@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private readonly snackBar: MatSnackBar, private readonly matDialog: MatDialog) {}

    openDialog(component, data?, config?) {
        return this.matDialog.open(component, { ...(config || {}), data });
    }

    displayNotification(text: string) {
        return this.snackBar.open(text);
    }

    flashError(errorMessage: string) {
        return this.snackBar.open(errorMessage, 'Verwerfen', { duration: 3000, panelClass: ['mat-toolbar', 'mat-warn'] });
    }

    flashSuccess(msg: string) {
        return this.snackBar.open(msg, 'Verwerfen', { duration: 3000, panelClass: ['mat-toolbar', 'mat-success'] });
    }

    confirm(msg: string, title: string) {
        return this.matDialog.open(ConfirmTemplateComponent, {
            minWidth: '20vw',
            data: {
                msg,
                title
            }
        });
    }
}
