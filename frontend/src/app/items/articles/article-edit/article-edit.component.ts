import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Article } from '../../../../../../backend/src/models/article.model';
import { DialogService } from '../../../services/dialog.service';
import { ArticleService } from '../../../services/items/article.service';


@Component({
    selector: 'app-article-edit',
    templateUrl: './article-edit.component.html',
    styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
    content = '';
    article: Article;
    articleID: string;
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

    private subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private dialogService: DialogService) {
        this.subscriptions.push(
            this.route.paramMap.subscribe(paramMap => {
                const uniqueTitle = paramMap.get('title');
                this.articleID = uniqueTitle.split('_')[uniqueTitle.split('_').length - 1];
            })
        );
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.article = articles.find(article => Number(article.id) === Number(this.articleID));
                if (this.article) {
                    this.content = this.article.content;
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
        // TODO: Open dialog to change title
    }

    editImage() {
        // TODO: Open dialog to change image
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
}
