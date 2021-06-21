import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Article } from 'src/app/backend-datatypes/article.model';
import { ShortFile } from 'src/app/backend-datatypes/short-file.model';
import { ArticleCardComponent } from 'src/app/items/articles/article-card/article-card.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ArticleService } from 'src/app/services/items/article.service';
import { FileService } from 'src/app/services/items/file.service';


@Component({
    selector: 'app-quicklink',
    templateUrl: './quicklink.component.html',
    styleUrls: ['./quicklink.component.scss']
})
export class QuicklinkComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    isFile: boolean;
    isArticle: boolean;

    file: ShortFile;
    article: Article;

    static getFileQuickUrl(file: ShortFile): string {
        return `/q/datei-${file.id}`;
    }

    static getArticleQuickUrl(article: Article): string {
        return `/q/artikel-${article.id}`;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService,
        private fileService: FileService,
        private dialogSerivice: DialogService
    ) {
        this.subscriptions.push(
            this.route.paramMap.subscribe(paramMap => {
                const uniqueTitle = paramMap.get('query');
                if (uniqueTitle) {
                    const type = uniqueTitle.split('-')[0];
                    switch (type) {
                        case 'datei':
                            const fileId = uniqueTitle.split('-')[1];
                            this.isFile = true;
                            this.downloadFileFromId(fileId);
                            break;

                        case 'artikel':
                            const articleId = uniqueTitle.split('-')[1];
                            this.isArticle = true;
                            this.navigateToArticleById(articleId);
                            break;
                        default:
                            this.showError();
                            this.isArticle = true;

                            break;
                    }
                } else {
                    this.showError();
                }
            })
        );
    }
    
    ngOnInit(): void {}

    navigateToArticleById(articleId: string) {
        this.subscriptions.push(this.articleService.articles.subscribe(articles => {
            if(articles.length) {
                const target = articles.find(article => article.id == articleId);
                if (target) {
                    this.router.navigateByUrl(ArticleCardComponent.getArticleLink(target));
                } else {
                    this.showError();
                }
            }
        }));
        this.articleService.get();
    }

    downloadFileFromId(id) {
        this.subscriptions.push(
            this.fileService.files.subscribe(files => {
                if(files.length) {
                    const target = files.find(file => file.id == id);
                    if(!!target) {
                        this.file = target;
                        this.fileService.download(target);
                    } else {
                        this.showError();
                    }
                }
            })
        );
        this.fileService.get();
    }

    showError() {
        this.dialogSerivice.flashError('Leider konnten wir den Artikel oder die Datei nicht finden.');
        this.router.navigateByUrl('/');
    }

    tryAgain() {
        if(this.isFile) {
            this.fileService.download(this.file);
        } else {

        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
