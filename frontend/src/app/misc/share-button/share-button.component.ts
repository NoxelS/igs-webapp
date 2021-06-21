import { Component, Input } from '@angular/core';

import { Article } from 'src/app/backend-datatypes/article.model';
import { ShortFile } from 'src/app/backend-datatypes/short-file.model';
import { DialogService } from 'src/app/services/dialog.service';

import { QuicklinkComponent } from '../quicklink/quicklink.component';


@Component({
    selector: 'share-button',
    templateUrl: './share-button.component.html',
    styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {
    @Input()
    public set refrence(value: Article | ShortFile) {
        this._refrence = value;
        if (this.refrence && (this.refrence as any).title) {
            this.isFile = false;
            this.isArticle = true;
        }
    }

    public get refrence(): Article | ShortFile {
        return this._refrence;
    }

    private _refrence: Article | ShortFile;
    isFile: boolean;
    isArticle: boolean;

    constructor(private dialogService: DialogService) {}

    share() {
        if (this.refrence) {
            if (this.isArticle) {
                this.copyMessage(window.location.origin + QuicklinkComponent.getArticleQuickUrl(this.refrence as Article));
            } else if (this.isFile) {
                this.copyMessage(window.location.origin + QuicklinkComponent.getFileQuickUrl(this.refrence as ShortFile));
            } else {
                this.dialogService.flashError('Leider konnten wir den Artikel oder die Datei nicht teilen.');
            }
        } else {
            this.dialogService.flashError('Leider konnten wir den Artikel oder die Datei nicht teilen.');
        }
    }

    static copyToClipboard(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    copyMessage(val: string) {
        ShareButtonComponent.copyToClipboard(val)
        this.dialogService.flashSuccess('Der Link wurde in die Zwischenablage kopiert.');
    }

    static shareFile(file: ShortFile) {
        ShareButtonComponent.copyToClipboard(window.location.origin + QuicklinkComponent.getFileQuickUrl(file as ShortFile));
    }
}
