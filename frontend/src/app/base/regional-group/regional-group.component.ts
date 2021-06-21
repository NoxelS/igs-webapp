import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Article } from 'src/app/backend-datatypes/article.model';
import { Regionalgruppe } from 'src/app/backend-datatypes/user.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ArticleService } from 'src/app/services/items/article.service';
import { routePaths } from 'src/app/shared/routes.const';


@Component({
    selector: 'app-regional-group',
    templateUrl: './regional-group.component.html',
    styleUrls: ['./regional-group.component.scss']
})
export class RegionalGroupComponent implements OnInit, OnDestroy {
    regionalgroup: Regionalgruppe;
    articles: Article[];

    private subscriptions: Subscription[] = [];

    static buildRegionalgroupFromUrl(url: string): Regionalgruppe {
        return url.replace(/\-/g, '/').replace(/\_/g, ' ') as Regionalgruppe;
    }

    static generateRegionalgroupUrl(regionalgroup: Regionalgruppe) {
        return `/${routePaths.REGIONAL_GROUP.replace(':name', regionalgroup.replace(/\//g, '-').replace(/[\n\r\s]+/g, '_'))}`;
    }

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private dialogService: DialogService) {
        this.subscriptions.push(
            this.route.paramMap.subscribe(paramMap => {
                const uniqueTitle = paramMap.get('name');
                this.regionalgroup = RegionalGroupComponent.buildRegionalgroupFromUrl(uniqueTitle);
                this.articleService.get();
            })
        );
        this.subscriptions.push(
            articleService.articles.subscribe(articles => {
                console.log('articles:');
                this.articles = articles
                    .map(article => { 
                        console.log(`Checking aritcle scope ${article.scope} to equal ${this.regionalgroup}`);
                        return article;})
                    .filter(article => (article.scope as any) === this.regionalgroup)
                    .sort((a: any, b: any) => {
                        const data1 = new Date(a.creationDate.split('.')[2], a.creationDate.split('.')[1] - 1, a.creationDate.split('.')[0]);
                        const data2 = new Date(b.creationDate.split('.')[2], b.creationDate.split('.')[1] - 1, b.creationDate.split('.')[0]);
                        return data2.getTime() - data1.getTime();
                    });
                console.log(articles.length);
                console.log(this.articles.length);
                console.log(this.articles);
            })
        );
    }
    ngOnInit() {}

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
