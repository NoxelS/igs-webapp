import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './articles-list/article/article.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ArticleService } from './services/article-service.service';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
    declarations: [AppComponent, ArticlesListComponent, ArticleComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule, MatMenuModule, HttpClientModule, MatToolbarModule, MatIconModule, MatButtonModule, MatGridListModule],
    providers: [ArticleService, AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
