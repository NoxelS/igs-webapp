import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './base/about/about.component';
import { ImpressumComponent } from './base/impressum/impressum.component';
import { LatestNewsComponent } from './base/latest-news/latest-news.component';
import { RegionalGroupComponent } from './base/regional-group/regional-group.component';
import { ArticleCreateComponent } from './items/articles/article-create/article-create.component';
import { ArticleEditComponent } from './items/articles/article-edit/article-edit.component';
import { ArticleReadComponent } from './items/articles/article-read/article-read.component';
import { ArticlesListComponent } from './items/articles/articles-list/articles-list.component';
import { FilesListComponent } from './items/files/files-list/files-list.component';
import { RecoverPasswordComponent } from './misc/recover-password/recover-password.component';
import { UserSettingsComponent } from './misc/user-settings/user-settings.component';
import { routePaths } from './shared/routes.const';
import { ServermanagementComponent } from './superuser/servermanagement/servermanagement.component';
import { UsermanagementComponent } from './superuser/usermanagement/usermanagement.component';


const routes: Routes = [
    { path: routePaths.ROOT, redirectTo: routePaths.ARTICLES, pathMatch: 'full' },
    { path: routePaths.ARTICLES, component: ArticlesListComponent},
    { path: routePaths.ARTICLE_READ, component: ArticleReadComponent },
    { path: routePaths.ARTICLE_EDIT, component: ArticleEditComponent },
    { path: routePaths.ARTICLE_CREATE, component: ArticleCreateComponent },
    { path: routePaths.FILES, component: FilesListComponent },
    { path: routePaths.RESET_PASSWORD, component: RecoverPasswordComponent },
    { path: routePaths.USER_SETTINGS, component: UserSettingsComponent },
    { path: routePaths.USERMANAGEMENT, component: UsermanagementComponent },
    { path: routePaths.SERVERMANAGEMENT, component: ServermanagementComponent },
    { path: routePaths.ABOUT, component: AboutComponent },
    { path: routePaths.IMPRESSUM, component: ImpressumComponent },
    { path: routePaths.LATEST_NEWS, component: LatestNewsComponent },
    { path: routePaths.REGIONAL_GROUP, component: RegionalGroupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
