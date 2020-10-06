import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routePaths = {
    ROOT: ''
};

// const routes: Routes = [{ path: routePaths.ROOT, component: ArticlesListComponent }];
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
