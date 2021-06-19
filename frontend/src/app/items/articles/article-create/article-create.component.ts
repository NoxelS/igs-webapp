import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Article, ArticleScope } from 'src/app/backend-datatypes/article.model';
import { FileScope } from 'src/app/backend-datatypes/short-file.model';
import { User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ArticleService } from 'src/app/services/items/article.service';
import { routePaths } from 'src/app/shared/routes.const';
import { EditTextComponent, EditTextInjectionData } from 'src/app/template/edit-text/edit-text.component';


@Component({
    selector: 'app-article-create',
    templateUrl: './article-create.component.html',
    styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    user: User;

    articleTitle: string;
    articleDescription: string;
    articleImage: string;
    articleContent: string;
    articleScope: string;

    articleScopeRegions: ArticleScope[];
    articleScopeEnum = ArticleScope;

    options = {
        showPreviewPanel: false, // Show preview panel, Default is true
        showBorder: false, // Show editor component's border. Default is true
        hideIcons: ['Code'], // ['Bold', 'Italic', 'Heading', 'Refrence', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen']. Default is empty
        // usingFontAwesome5?: boolean   // Using font awesome with version 5, Default is false
        scrollPastEnd: 0, // The option for ace editor. Default is 0
        // enablePreviewContentClick?: boolean  // Allow user fire the click event on the preview panel, like href etc. Default is false
        resizable: true // Allow resize the editor
        // markedjsOpt?: MarkedjsOption  // The markedjs option, see https://marked.js.org/#/USING_ADVANCED.md#options
        // customRender?: {              // Custom markedjs render
        //   image?: Function     // Image Render
        //   table?: Function     // Table Render
        //   code?: Function      // Code Render
        //   listitem?: Function  // Listitem Render
        // }
    };

    constructor(
        private authService: AuthenticationService,
        private articleService: ArticleService,
        private dialogService: DialogService,
        private route: Router
    ) {
        this.subscriptions.push(
            authService.user.subscribe(user => {
                if (user) {
                    this.user = user;
                    this.articleScope = user.regionalgruppe as any;
                    if (user.isSuperUser) {
                        this.articleScope = FileScope.general;
                    }
                }
            })
        );

        this.articleScopeRegions = Object.entries(ArticleScope).map(KeyValue => KeyValue[1]);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    selectImage() {
        this.dialogService
            .openDialog(EditTextComponent, <EditTextInjectionData>{
                text: this.articleImage || '',
                title: 'Bild ' + (!!this.articleImage ? 'Ändern' : 'Auswählen'),
                image: true
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.articleImage = result;
                }
            });
    }

    createArticle() {
        if (this.canCreate) {
            const date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}` as any;

           const defaultImage ="https://images.pexels.com/photos/6985045/pexels-photo-6985045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

            const newArticle = new Article(
                this.articleTitle,
                0,
                date,
                this.articleImage || defaultImage,
                this.articleContent,
                this.articleDescription,
                '',
                this.articleScope as any,
                this.user.id,
                this.user.name
            );
            this.articleService.create(newArticle).subscribe(res => {
                if (res.successful) {
                    this.dialogService.flashSuccess('Der Artikel wurde erfolgreich erstellt');
                    const urlToNewArticle = `/${routePaths.ARTICLE_READ.replace(':title', newArticle.title.replace(/[\n\r\s]+/g, '_'))}_${res.data}`;
                    this.route.navigateByUrl(urlToNewArticle)
                } else {
                    this.dialogService.flashError('Leider konnte der Artikel nicht erstellt werden: ' + res.errorMessage);
                }
            });
        }
    }

    canCreate(): boolean {
        return !!this.articleTitle && !!this.articleContent && !!this.articleScope;
    }
}
