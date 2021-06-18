import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { routePaths } from 'src/app/shared/routes.const';

import { Article } from '../../backend-datatypes/article.model';
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
                this.articleList = articles;
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
