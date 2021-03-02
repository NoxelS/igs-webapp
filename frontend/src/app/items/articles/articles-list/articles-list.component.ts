import { Component, OnInit } from '@angular/core';

import { Article } from '../../../../../../backend/src/models/article.model';
import { ArticleService } from '../../../services/items/article.service';


@Component({
    selector: 'app-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
    private MAX_DESCRIPTION_CHARLENGTH = 300;

    landingArticle: Article;
    articles: Article[] = [];

    constructor(private articleService: ArticleService) {
        articleService.articles.subscribe(articles => {
            this.articles = articles;
            this.landingArticle = articles[0];
        });
    }

    ngOnInit(): void {
        this.articleService.get();
    }

    cropArticleDescription(articleContent: string): string {
        if (articleContent.length > this.MAX_DESCRIPTION_CHARLENGTH) {
            var lastLength = 0;
            var description: string;
            articleContent.split(' ').forEach((chunk, index, array) => {
                if (lastLength < this.MAX_DESCRIPTION_CHARLENGTH && (lastLength += chunk.length) > this.MAX_DESCRIPTION_CHARLENGTH) {
                    description = array.slice(0, index + 1).join(' ') + '...';
                }
            });
            return description;
        } else {
            return articleContent;
        }
    }
}
