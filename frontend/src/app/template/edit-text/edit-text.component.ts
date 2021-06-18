import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ArticleService } from 'src/app/services/items/article.service';


export interface EditTextInjectionData {
    text: string;
    title: string;
    image?: boolean;
    multiline?: boolean;
}

@Component({
    templateUrl: './edit-text.component.html',
    styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent {
    text: string = '';
    isMultiLine: boolean;
    isImage: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: EditTextInjectionData,
        public dialogRef: MatDialogRef<EditTextComponent>,
        private readonly articleService: ArticleService
    ) {
        this.text = data.text || '';
        this.isMultiLine = !!data.multiline;
        this.isImage = !!data.image;
    }

    canSave(): boolean {
        if (this.isImage) {
            return this.articleService.imageIsFromPexels(this.text);
        }
        return !!this.text.length;
    }

    /** Return the text or null if aborted. */
    confirm(result: boolean) {
        this.dialogRef.close(result ? this.text : null);
    }
}
