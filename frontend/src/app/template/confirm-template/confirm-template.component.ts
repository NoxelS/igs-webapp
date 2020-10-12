import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: './confirm-template.component.html',
    styleUrls: ['./confirm-template.component.scss']
})
export class ConfirmTemplateComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ConfirmTemplateComponent>) {}

    confirm(result: boolean) {
        this.dialogRef.close(result);
    }
}
