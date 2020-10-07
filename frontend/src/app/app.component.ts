import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from './backend-datatypes/article.model';
import { ArticleService } from './services/article-service.service';
import { AuthenticationService } from './services/authentication.service';
import { FileService } from './services/file-service.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    tiles = [
        { text: 'One', cols: 4, rows: 1, color: 'lightblue' },
        { text: 'Two', cols: 2, rows: 1, color: 'lightgreen' },
        { text: 'Three', cols: 2, rows: 1, color: 'lightpink' }
    ];

    articles$: Observable<Article[]>;
    files$;

    currentUser;
    loggedIn;

    constructor(private readonly articleSerivce: ArticleService, private readonly auth: AuthenticationService, private readonly fileService: FileService) {
        this.articles$ = articleSerivce.articles;
        this.files$ = fileService.fileChange$;
        // this.fileService.downloadFile(2);
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }

    info() {
        this.auth.updateUserInformation();
    }

    getArticles() {
        this.articleSerivce.getArticles();
    }

    createArticle() {
        this.articleSerivce.createArticle(new Article(Math.random() * 1000 + '', 1, new Date().getTime(), 'empty', 'description', 'will be changed'));
    }

    editArticle() {
        this.articleSerivce.editArticle(new Article(Math.random() * 1000 + '', 1, new Date().getTime(), 'empty', 'description', '6'));
    }

    removeArticle() {
        this.articleSerivce.removeArticle(new Article(Math.random() * 1000 + '', 1, new Date().getTime(), 'empty', 'description', '5'));
    }

    getFiles() {
        this.fileService.getFiles();
    }

    createFile() {}
    editFile() {}
    removeFile() {}

    ngOnInit(): void {
        this.currentUser = this.auth.$currentUser;
        this.loggedIn = this.auth.$loggedIn;
    }
}
