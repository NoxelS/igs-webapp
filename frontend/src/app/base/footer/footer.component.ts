import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { routePaths } from 'src/app/shared/routes.const';

import { Article, ArticleScope } from '../../backend-datatypes/article.model';
import { ArticleService } from '../../services/items/article.service';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    articleList: Article[] = [];
    subscription: Subscription[] = [];

    readonly routes = routePaths;

    constructor(private readonly articleService: ArticleService) {}

    ngOnInit(): void {
        this.subscription.push(
            this.articleService.articles.subscribe(articles => {
                this.articleList = articles
                    .filter(article => article.scope == ArticleScope.mainPage)
                    .sort((a: any, b: any) => {
                        const data1 = new Date(a.creationDate.split('.')[2], a.creationDate.split('.')[1] - 1, a.creationDate.split('.')[0]);
                        const data2 = new Date(b.creationDate.split('.')[2], b.creationDate.split('.')[1] - 1, b.creationDate.split('.')[0]);
                        return data2.getTime() - data1.getTime();
                    });
            })
        );
    }

    ngOnDestroy() {
        this.subscription.forEach(s => s.unsubscribe);
    }

    getArticleLink(article: Article): string {
        return `/${routePaths.ARTICLE_READ.replace(':title', article.title.replace(/[\n\r\s]+/g, '_'))}_${article.id}`;
    }
}
