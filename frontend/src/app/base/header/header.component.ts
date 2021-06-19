import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Regionalgruppe, User } from 'src/app/backend-datatypes/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { routePaths } from 'src/app/shared/routes.const';

import { Article } from '../../../../../backend/src/models/article.model';
import { ArticleService } from '../../services/items/article.service';
import { RegionalGroupComponent } from '../regional-group/regional-group.component';


@Component({
    selector: 'igs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    user: User;
    subscription: Subscription[] = [];
    articlesArray: Article[] = [];

    usersRegionalgroups: Regionalgruppe[];

    readonly routes = routePaths;

    constructor(private readonly authService: AuthenticationService, private readonly articleService: ArticleService) {
        this.subscription.push(
            this.articleService.articles.subscribe(articles => {
                this.articlesArray = articles;
            })
        );
    }

    ngOnInit() {
        this.subscription.push(
            this.authService.user.subscribe(user => {
                this.user = user;

                if(user) {
                    if (user.isSuperUser) {
                        this.usersRegionalgroups = Object.entries(Regionalgruppe).map((keyValue, index) => keyValue[1]);
                    } else {
                        this.usersRegionalgroups = [user.regionalgruppe];
                    }
                }
            })
        );
        this.articleService.get();
    }

    ngOnDestroy() {
        this.subscription.forEach(s => s.unsubscribe);
    }

    getArticleLink(article: Article): string {
        return `/${routePaths.ARTICLE_READ.replace(':title', article.title.replace(/[\n\r\s]+/g, '_'))}_${article.id}`;
    }

    getLinkToRegionalGroup(region: Regionalgruppe): string {
        return RegionalGroupComponent.generateRegionalgroupUrl(region);
    }
}
