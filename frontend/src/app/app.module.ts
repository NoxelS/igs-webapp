import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header/header.component';
import { LoginComponent } from './base/header/login/login.component';
import { ArticleReadComponent } from './items/articles/article-read/article-read.component';
import { ArticlesListComponent } from './items/articles/articles-list/articles-list.component';
import { FilesListComponent } from './items/files/files-list/files-list.component';
import { RecoverPasswordComponent } from './misc/recover-password/recover-password.component';
import { AuthenticationService } from './services/authentication.service';
import { DialogService } from './services/dialog.service';
import { ArticleService } from './services/items/article.service';
import { FileService } from './services/items/file.service';
import { AddHeaderInterceptor } from './shared/header.interceptor';
import { IsLoggedInDirective } from './shared/is-logged-in.directive';
import { ConfirmTemplateComponent } from './template/confirm-template/confirm-template.component';
import { LoginTemplateComponent } from './template/login/login-template.component';
import { ResetPasswordComponent } from './template/reset-password/reset-password.component';


@NgModule({
    declarations: [AppComponent, HeaderComponent, LoginComponent, LoginTemplateComponent, ResetPasswordComponent, IsLoggedInDirective, ArticlesListComponent, FilesListComponent, ConfirmTemplateComponent, RecoverPasswordComponent, ArticleReadComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatChipsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatExpansionModule,
        MatRippleModule,
        ReactiveFormsModule,
        MarkdownModule.forRoot(),
        MarkdownModule.forRoot({ loader: HttpClient }),
    ],
    providers: [
        ArticleService,
        AuthenticationService,
        FileService,
        DialogService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddHeaderInterceptor,
            multi: true
        }
    ],
    entryComponents: [LoginTemplateComponent, ResetPasswordComponent, ConfirmTemplateComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
