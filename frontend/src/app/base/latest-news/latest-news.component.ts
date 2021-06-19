import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Article, ArticleScope } from 'src/app/backend-datatypes/article.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ArticleService } from 'src/app/services/items/article.service';


@Component({
    selector: 'app-latest-news',
    templateUrl: './latest-news.component.html',
    styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnDestroy {
    articles: Article[];

    private subscriptions: Subscription[] = [];

    constructor(private articleService: ArticleService, private dialogService: DialogService) {
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                this.articles = articles
                    .filter(article => article.scope === ArticleScope.latestNews)
                    .sort((a: any, b: any) => {
                        const data1 = new Date(a.creationDate.split('.')[2], a.creationDate.split('.')[1] - 1, a.creationDate.split('.')[0]);
                        const data2 = new Date(b.creationDate.split('.')[2], b.creationDate.split('.')[1] - 1, b.creationDate.split('.')[0]);
                        return data2.getTime() - data1.getTime();
                    });
            })
        );
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
