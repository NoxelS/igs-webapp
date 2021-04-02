import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleEditComponent } from './items/articles/article-edit/article-edit.component';
import { ArticleReadComponent } from './items/articles/article-read/article-read.component';
import { ArticlesListComponent } from './items/articles/articles-list/articles-list.component';
import { FilesListComponent } from './items/files/files-list/files-list.component';
import { RecoverPasswordComponent } from './misc/recover-password/recover-password.component';
import { routePaths } from './shared/routes.const';
import { ServermanagementComponent } from './superuser/servermanagement/servermanagement.component';
import { UsermanagementComponent } from './superuser/usermanagement/usermanagement.component';


const routes: Routes = [
    { path: routePaths.ROOT, redirectTo: routePaths.ARTICLES, pathMatch: 'full' },
    { path: routePaths.ARTICLES, component: ArticlesListComponent},
    { path: routePaths.ARTICLE_READ, component: ArticleReadComponent },
    { path: routePaths.ARTICLE_EDIT, component: ArticleEditComponent },
    { path: routePaths.FILES, component: FilesListComponent },
    { path: routePaths.RESET_PASSWORD, component: RecoverPasswordComponent },
    { path: routePaths.USERMANAGEMENT, component: UsermanagementComponent },
    { path: routePaths.SERVERMANAGEMENT, component: ServermanagementComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
