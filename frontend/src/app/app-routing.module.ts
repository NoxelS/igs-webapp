import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesListComponent } from './items/articles/articles-list/articles-list.component';
import { FilesListComponent } from './items/files/files-list/files-list.component';
import { RecoverPasswordComponent } from './misc/recover-password/recover-password.component';


export const routePaths = {
    ROOT: '',
    FILES: 'files',
    ARTICLES: 'artikel',
    RESET_PASSWORD: 'reset-password'
};

const routes: Routes = [
    { path: routePaths.ROOT, redirectTo: routePaths.ARTICLES, pathMatch: 'full' },
    { path: routePaths.ARTICLES, component: ArticlesListComponent },
    { path: routePaths.FILES, component: FilesListComponent },
    { path: routePaths.RESET_PASSWORD, component: RecoverPasswordComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
