import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Article } from '../../backend-datatypes/article.model';
import { IgsResponse, SuccessResponse } from '../../backend-datatypes/response.model';
import { ApiEndpointArticle } from '../endpoints.const';
import { ItemService } from '../items/item-service';


@Injectable({ providedIn: 'root' })
export class ArticleService implements ItemService<Article> {
    private articleList: Article[] = [];
    private articleChange$: BehaviorSubject<Article[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {}

    get articles(): Observable<Article[]> {
        return this.articleChange$.asObservable();
    }

    /** Trigger the ArticleService to fetch new articles. */
    get() {
        this.http.get(ApiEndpointArticle.get).subscribe(
            (res: IgsResponse<Article[]>) => {
                if (res.successful) {
                    this.articleList = res.data;
                    this.articleChange$.next(this.articleList);
                }
            },
            _ => _
        );
    }

    /** Create a new article. */
    create(article: Article) {
        this.http.post(ApiEndpointArticle.create, article).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.get();
                }
            },
            _ => _
        );
    }

    /** Edit an existing article. */
    edit(article: Article) {
        this.http.post(ApiEndpointArticle.edit, article).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.get();
                }
            },
            _ => _
        );
    }

    /** Remove an article. */
    remove(article: Article) {
        this.http.post(ApiEndpointArticle.remove, article).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.get();
                }
            },
            _ => _
        );
    }
}
