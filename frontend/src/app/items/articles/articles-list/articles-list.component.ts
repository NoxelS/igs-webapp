import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { routePaths } from 'src/app/shared/routes.const';

import { Article } from '../../../../../../backend/src/models/article.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { DialogService } from '../../../services/dialog.service';
import { ArticleService } from '../../../services/items/article.service';


@Component({
    selector: 'app-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {
    private MAX_DESCRIPTION_CHARLENGTH = 300;

    articles: Article[] = [];
    loggedIn = false;

    private subscriptions: Subscription[] = [];
    constructor(private articleService: ArticleService, private authenticationService: AuthenticationService, private dialogService: DialogService) {
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.articles = articles;
            })
        );

        this.subscriptions.push(this.authenticationService.loggedIn.subscribe(loggedIn => (this.loggedIn = loggedIn)));
    }

    ngOnInit() {
        this.articleService.get();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe);
    }

    getArticleLink(article: Article): string {
        return `/${routePaths.ARTICLE_READ.replace(':title', article.title.replace(/[\n\r\s]+/g, '_'))}_${article.id}`;
    }

    getEditArticleLink(article: Article): string {
        return `/${routePaths.ARTICLE_EDIT.replace(':title', article.title.replace(/[\n\r\s]+/g, '_'))}_${article.id}`;
    }

    deleteArticle(article: Article) {
        this.dialogService
            .confirm(`Möchten Sie den Artikel "${article.title}" vom ${article.creationDate} wirklich löschen?`, 'Löschen bestätigen')
            .afterClosed()
            .subscribe(confimred => {
                if (confimred) {
                    this.articleService.remove(article).subscribe(success => {
                        if (success) {
                            this.dialogService.flashSuccess('Der Artikel wurde erfolgreich gelöscht');
                        } else {
                            this.dialogService.flashError('Leider konnte der Artikel nicht gelöscht werden. Versuchen Sie es später noch einmal.');
                        }
                    });
                }
            });
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }
}
