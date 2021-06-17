import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { routePaths } from 'src/app/shared/routes.const';

import { Article } from '../../../../../../backend/src/models/article.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { ArticleService } from '../../../services/items/article.service';


interface UploadResult {
    isImg: boolean;
    name: string;
    url: string;
}

@Component({
    selector: 'app-article-read',
    templateUrl: './article-read.component.html',
    styleUrls: ['./article-read.component.scss']
})
export class ArticleReadComponent implements OnInit, OnDestroy {
    article: Article;
    articleID: string;
    isLoggedIn: boolean;
    @ViewChild('top', {}) top: HTMLElement;

    private subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private authService: AuthenticationService) {
        this.subscriptions.push(
            this.route.paramMap.subscribe(paramMap => {
                const uniqueTitle = paramMap.get('title');
                this.articleID = uniqueTitle.split('_')[uniqueTitle.split('_').length - 1];
                this.articleService.get();
            })
        );
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.article = articles.find(article => Number(article.id) === Number(this.articleID));
            })
        );
        this.subscriptions.push(authService.loggedIn.subscribe(loggedIn => (this.isLoggedIn = loggedIn)));
    }

    ngOnInit() {
        this.articleService.get();
        if(this.top) {
            this.top.scrollIntoView();
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    getReadTime(text: string): number {
        return Math.round(text.split(/[\n\r\s]+/g).length / 120) + 1;
    }

    getEditArticleLink(): string {
        return `/${routePaths.ARTICLE_EDIT.replace(':title', this.article.title.replace(/[\n\r\s]+/g, '_'))}_${this.article.id}`;
    }
}
