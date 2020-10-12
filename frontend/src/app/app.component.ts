import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from './backend-datatypes/article.model';
import { AuthenticationService } from './services/authentication.service';
import { DialogService } from './services/dialog.service';
import { ArticleService } from './services/items/article.service';
import { FileService } from './services/items/file.service';


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

    constructor(
        private readonly articleSerivce: ArticleService,
        private readonly auth: AuthenticationService,
        private readonly fileService: FileService,
        private readonly dialogService: DialogService
    ) {
        this.articles$ = articleSerivce.articles;
        this.files$ = fileService.files;
        this.dialogService.flashError('Error');
    }

    login() {
        this.auth.login('noel', 'noel');
    }

    logout() {
        this.auth.logout();
    }

    info() {
        this.auth.updateUserInformation();
    }

    getArticles() {
        this.articleSerivce.get();
    }

    createArticle() {
        this.articleSerivce.create(new Article(Math.random() * 1000 + '', 1, new Date().getTime(), 'empty', 'description', 'will be changed'));
    }

    editArticle() {
        this.articleSerivce.edit(new Article(Math.random() * 1000 + '', 1, new Date().getTime(), 'empty', 'description', '6'));
    }

    removeArticle() {
        this.articleSerivce.remove(new Article(Math.random() * 1000 + '', 1, new Date().getTime(), 'empty', 'description', '5'));
    }

    getFiles() {
        this.fileService.get();
    }

    createFile() {}
    editFile() {}
    removeFile() {}
    handleFileInput(file: FileList) {
        console.log(file.item(0));
        this.fileService.create(file.item(0), 'Test Desc.');
    }

    download() {
        // this.fileService.files.subscribe(shortFiles => {
        //     shortFiles.forEach(file => this.fileService.download(file));
        // });
    }
    ngOnInit(): void {
        this.currentUser = this.auth.user;
        this.loggedIn = this.auth.loggedIn;
    }
}
