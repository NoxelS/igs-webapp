import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from '../models/article.model';
import { ArticleService } from '../services/article-service.service';


@Component({
    selector: 'igs-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
    tiles = [
        { text: 'One', cols: 4, rows: 1, color: 'lightblue' },
        { text: 'Two', cols: 2, rows: 1, color: 'lightgreen' },
        { text: 'Three', cols: 2, rows: 1, color: 'lightpink' }
    ];

    articles$: Observable<Article[]>;
    
    constructor(private readonly articleSerivce: ArticleService) {
      this.articles$ = articleSerivce.articles;
    }

    ngOnInit(): void {}
}
