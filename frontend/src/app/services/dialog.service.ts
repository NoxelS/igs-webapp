import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private readonly snackBar: MatSnackBar, private readonly matDialog: MatDialog) {}

    openDialog(component, data?) {
        return this.matDialog.open(component, { data });
    }

    displayNotification(text: string) {
        return this.snackBar.open(text);
    }

    flashError(errorMessage: string) {
        return this.snackBar.open(errorMessage, 'Verwerfen', { duration: 3000, panelClass: ['mat-toolbar', 'mat-warn'] });
    }
}
