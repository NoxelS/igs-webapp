import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { routePaths } from 'src/app/shared/routes.const';
import { EditTextComponent, EditTextInjectionData } from 'src/app/template/edit-text/edit-text.component';

import { Article } from '../../../../../../backend/src/models/article.model';
import { DialogService } from '../../../services/dialog.service';
import { ArticleService } from '../../../services/items/article.service';


@Component({
    selector: 'app-article-edit',
    templateUrl: './article-edit.component.html',
    styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, OnDestroy {

    private _content = '';

    public get content() {
        return this._content;
    }

    public set content(value) {
        this.contentChanged = (!!this._content.length && this._content !== value && value !== this.article.content);
        this._content = value;
    }

    article: Article;
    articleID: string;
    contentChanged: boolean;

    options = {
        showPreviewPanel: false, // Show preview panel, Default is true
        showBorder: false, // Show editor component's border. Default is true
        hideIcons: ['Code'], // ['Bold', 'Italic', 'Heading', 'Refrence', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen']. Default is empty
        // usingFontAwesome5?: boolean   // Using font awesome with version 5, Default is false
        scrollPastEnd: 0, // The option for ace editor. Default is 0
        // enablePreviewContentClick?: boolean  // Allow user fire the click event on the preview panel, like href etc. Default is false
        resizable: true // Allow resize the editor
        // markedjsOpt?: MarkedjsOption  // The markedjs option, see https://marked.js.org/#/USING_ADVANCED.md#options
        // customRender?: {              // Custom markedjs render
        //   image?: Function     // Image Render
        //   table?: Function     // Table Render
        //   code?: Function      // Code Render
        //   listitem?: Function  // Listitem Render
        // }
    };

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '200px',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: 'Merriweather Sans',
        outline: true,
        defaultFontSize: '',
        fonts: [
            { class: 'Merriweather Sans', name: 'Merriweather Sans' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'arial', name: 'Arial' }
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote'
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1'
            }
        ],
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            [
                'subscript',
                'superscript',
                'fontName'
            ],
            [
                'fontSize',
                'textColor',
                'backgroundColor',
                'customClasses',
                'unlink',
                'insertImage',
                'insertVideo',
                'removeFormat',
                'toggleEditorMode'
            ]
        ]
    };

    private subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private dialogService: DialogService) {
        this.subscriptions.push(
            this.route.paramMap.subscribe(paramMap => {
                const uniqueTitle = paramMap.get('title');
                this.articleID = uniqueTitle.split('_')[uniqueTitle.split('_').length - 1];
                setTimeout(() => {
                    window.scroll(0,0);
                    document.body.scrollTop = 0;
                    document.querySelector('body').scrollTo(0,0)
                }, 0)
            })
        );
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.article = articles.find(article => Number(article.id) === Number(this.articleID));
                if (this.article) {
                    this.content = this.article.content;
                    this.contentChanged = false;

                    setTimeout(() => {
                        window.scroll(0,0);
                        document.body.scrollTop = 0;
                        document.querySelector('body').scrollTo(0,0)
                    }, 0)
                }
            })
        );
    }

    ngOnInit() {
        this.articleService.get();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    editTitle() {
        this.dialogService.openDialog(EditTextComponent, <EditTextInjectionData>{text: this.article.title, title: 'Titel Bearbeiten'}).afterClosed().subscribe(result => {
            if(result && result !== this.article.title) {
                const editArticle = {...this.article};
                editArticle.title = result;
                this.articleService.edit(editArticle).subscribe(success => {
                    if (success) {
                        this.dialogService.flashSuccess('Der Titel wurde erfolgreich geändert');
                    } else {
                        this.dialogService.flashError('Leider konnte der Titel nicht geändert werden. Versuchen Sie es später noch einmal.');
                    }
                    this.articleService.get()
                })
            }
        })
    }

    editImage() {
        this.dialogService.openDialog(EditTextComponent, <EditTextInjectionData>{text: this.article.imageUrl, title: 'Bild Bearbeiten', image: true}).afterClosed().subscribe(result => {
            if(result && result !== this.article.imageUrl) {
                const editArticle = {...this.article};
                editArticle.imageUrl = result;
                this.articleService.edit(editArticle).subscribe(success => {
                    if (success) {
                        this.dialogService.flashSuccess('Das Bild wurde erfolgreich geändert');
                    } else {
                        this.dialogService.flashError('Leider konnte das Bild nicht geändert werden. Versuchen Sie es später noch einmal.');
                    }
                    this.articleService.get()
                })
            }
        })
    }

    editDescription() {
        this.dialogService.openDialog(EditTextComponent, <EditTextInjectionData>{text: this.article.description, title: 'Beschreibung Bearbeiten', multiline: true}).afterClosed().subscribe(result => {
            if(result && result !== this.article.description) {
                const editArticle = {...this.article};
                editArticle.description = result;
                this.articleService.edit(editArticle).subscribe(success => {
                    if (success) {
                        this.dialogService.flashSuccess('Die Beschreibung wurde erfolgreich geändert');
                    } else {
                        this.dialogService.flashError('Leider konnte die Beschreibung nicht geändert werden. Versuchen Sie es später noch einmal.');
                    }
                    this.articleService.get()
                })
            }
        })
    }

    saveChanges() {
        const changedArticle = { ...this.article, content: this.content };
        this.articleService.edit(changedArticle).subscribe(success => {
            if (success) {
                this.dialogService.flashSuccess('Artikel wurde erfolgreich bearbeitet.');
            } else {
                this.dialogService.flashError('Leider konnte der Artikel nicht bearbeitet werden. Versuchen Sie es später erneut!');
            }
        });
    }

    getArticleLink(article: Article): string {
        return `/${routePaths.ARTICLE_READ.replace(':title', article.title.replace(/[\n\r\s]+/g, '_'))}_${article.id}`;
    }
}
