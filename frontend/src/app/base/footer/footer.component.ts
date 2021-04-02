import { Component, OnInit } from '@angular/core';

import { Article } from '../../backend-datatypes/article.model';
import { ArticleService } from '../../services/items/article.service';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  articleList: Article[] = [];  
  
  constructor(private readonly articleService: ArticleService) {}

    ngOnInit(): void {
      this.articleService.articles.subscribe(articles => {
        this.articleList = articles;
      })
    }
}
