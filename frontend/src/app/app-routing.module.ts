import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleReadComponent } from './items/articles/article-read/article-read.component';
import { ArticlesListComponent } from './items/articles/articles-list/articles-list.component';
import { FilesListComponent } from './items/files/files-list/files-list.component';
import { RecoverPasswordComponent } from './misc/recover-password/recover-password.component';


export const routePaths = {
    ROOT: '',
    FILES: 'dateien',
    ARTICLES: 'artikel',
    RESET_PASSWORD: 'passwort-zurücksetzen'
};

const routes: Routes = [
    { path: routePaths.ROOT, redirectTo: routePaths.ARTICLES, pathMatch: 'full' },
    { path: routePaths.ARTICLES, component: ArticlesListComponent},
    { path: 'article-read', component: ArticleReadComponent },
    { path: routePaths.FILES, component: FilesListComponent },
    { path: routePaths.RESET_PASSWORD, component: RecoverPasswordComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
