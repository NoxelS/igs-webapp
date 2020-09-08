import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesListComponent } from './articles-list/articles-list.component';


const routePaths = {
    ROOT: ''
};

const routes: Routes = [{ path: routePaths.ROOT, component: ArticlesListComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
