import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Article } from '../backend-datatypes/article.model';
import { IgsResponse, SuccessResponse } from '../backend-datatypes/response.model';


@Injectable({ providedIn: 'root' })
export class ArticleService {
    articleList: Article[] = [];
    articleChange$: BehaviorSubject<Article[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {}

    get articles(): Observable<Article[]> {
        return this.articleChange$.asObservable();
    }

    getArticles() {
        this.http.get(environment.backendUrl + '/articles/list').subscribe(
            (res: IgsResponse<Article[]>) => {
                if (res.successful) {
                    this.articleList = res.data;
                    this.articleChange$.next(this.articleList);
                }
                console.log(res);
            },
            _ => _
        );
    }

    createArticle(article: Article) {
        this.http.post(environment.backendUrl + '/articles/create', article).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.getArticles();
                }
                console.log(res);
            },
            _ => _
        );
    }

    editArticle(article: Article) {
        this.http.post(environment.backendUrl + '/articles/edit', article).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.getArticles();
                }
                console.log(res);
            },
            _ => _
        );
    }

    removeArticle(article: Article) {
        this.http.post(environment.backendUrl + '/articles/remove', article).subscribe(
            (res: SuccessResponse) => {
                if (res.successful) {
                    this.getArticles();
                }
                console.log(res);
            },
            _ => _
        );
    }
}
