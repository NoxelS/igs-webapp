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

    landingArticle: Article;
    gridArticles: Article[];
    articles: Article[] = [];
    loggedIn = false;

    private subscriptions: Subscription[] = [];
    constructor(private articleService: ArticleService, private authenticationService: AuthenticationService, private dialogService: DialogService) {
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.articles = articles;
                this.landingArticle = articles[0];
                this.gridArticles = articles.slice(1);
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

    cropArticleDescription(articleContent: string): string {
        if (articleContent.length > this.MAX_DESCRIPTION_CHARLENGTH) {
            let lastLength = 0;
            let description: string;
            articleContent.split(' ').forEach((chunk, index, array) => {
                if (lastLength < this.MAX_DESCRIPTION_CHARLENGTH && lastLength + chunk.length > this.MAX_DESCRIPTION_CHARLENGTH) {
                    description = array.slice(0, index + 1).join(' ') + '...';
                }
                lastLength += chunk.length;
            });
            return description;
        } else {
            return articleContent;
        }
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
}
