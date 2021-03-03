import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Article } from '../../../../../../backend/src/models/article.model';
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

    private subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private articleService: ArticleService) {
        this.subscriptions.push(
            this.route.paramMap.subscribe(paramMap => {
                const uniqueTitle = paramMap.get('title');
                this.articleID = uniqueTitle.split('_')[uniqueTitle.split('_').length - 1];
            })
        );
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.article = articles.find(article => Number(article.id) === Number(this.articleID));
                console.log(this.article);
            })
        );
    }

    ngOnInit() {
        this.articleService.get();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    getReadTime(text: string): number {
        return Math.round(text.split(/[\n\r\s]+/g).length / 120) + 1;
    }
}
