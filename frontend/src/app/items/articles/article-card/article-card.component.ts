import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ArticleService } from 'src/app/services/items/article.service';
import { routePaths } from 'src/app/shared/routes.const';

import { Article, ArticleScope } from '../../../backend-datatypes/article.model';


@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit, OnDestroy {
    private _article: Article;

    public get article(): Article {
        return this._article;
    }

    @Input()
    public set article(value: Article) {
        if (value.scope != ArticleScope.latestNews && value.scope != ArticleScope.mainPage) {
            this.regionalgroup = value.scope;
        } else {
            this.regionalgroup = null;
        }
        this._article = value;
    }

    user: User;
    loggedIn = false;
    regionalgroup: ArticleScope;

    canEditOrDeleteArticle() {
        return (this.loggedIn && this.user && this.user.id == this.article.authorId) || (this.user && this.user.isSuperUser);
    }

    private subscriptions: Subscription[] = [];

    constructor(private articleService: ArticleService, private authenticationService: AuthenticationService, private dialogService: DialogService) {
        this.subscriptions.push(this.authenticationService.loggedIn.subscribe(loggedIn => (this.loggedIn = loggedIn)));
        this.subscriptions.push(
            this.authenticationService.user.subscribe(user => {
                this.user = user;
            })
        );
    }

    ngOnInit() {}

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
}
