import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Article } from '../../../../../../backend/src/models/article.model';
import { ArticleService } from '../../../services/items/article.service';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
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
              this.article = articles.find(article => article.id === this.articleID);
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
