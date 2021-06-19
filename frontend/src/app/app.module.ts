import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MarkdownModule } from 'ngx-markdown';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './base/about/about.component';
import { FooterComponent } from './base/footer/footer.component';
import { HeaderComponent } from './base/header/header.component';
import { LoginComponent } from './base/header/login/login.component';
import { ImpressumComponent } from './base/impressum/impressum.component';
import { LatestNewsComponent } from './base/latest-news/latest-news.component';
import { RegionalGroupComponent } from './base/regional-group/regional-group.component';
import { ArticleCardComponent } from './items/articles/article-card/article-card.component';
import { ArticleCreateComponent } from './items/articles/article-create/article-create.component';
import { ArticleEditComponent } from './items/articles/article-edit/article-edit.component';
import { ArticleReadComponent } from './items/articles/article-read/article-read.component';
import { ArticlesListComponent } from './items/articles/articles-list/articles-list.component';
import { FilesListComponent } from './items/files/files-list/files-list.component';
import { RecoverPasswordComponent } from './misc/recover-password/recover-password.component';
import { UserSettingsComponent } from './misc/user-settings/user-settings.component';
import { AuthenticationService } from './services/authentication.service';
import { DialogService } from './services/dialog.service';
import { ArticleService } from './services/items/article.service';
import { FileService } from './services/items/file.service';
import { SuperuserService } from './services/superuser.service';
import { AddHeaderInterceptor } from './shared/header.interceptor';
import { IsLoggedInDirective } from './shared/is-logged-in.directive';
import { MatPaginatorIntlDE } from './shared/paginator-int';
import { ServermanagementComponent } from './superuser/servermanagement/servermanagement.component';
import { UsermanagementComponent } from './superuser/usermanagement/usermanagement.component';
import { AddNewFileComponent } from './template/add-new-file/add-new-file.component';
import { AddNewUserComponent } from './template/add-new-user/add-new-user.component';
import { ConfirmTemplateComponent } from './template/confirm-template/confirm-template.component';
import { EditTextComponent } from './template/edit-text/edit-text.component';
import { LoginTemplateComponent } from './template/login/login-template.component';
import { ResetPasswordComponent } from './template/reset-password/reset-password.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        LoginTemplateComponent,
        ResetPasswordComponent,
        EditTextComponent,
        IsLoggedInDirective,
        ArticlesListComponent,
        FilesListComponent,
        ConfirmTemplateComponent,
        RecoverPasswordComponent,
        ArticleReadComponent,
        ArticleEditComponent,
        FooterComponent,
        ServermanagementComponent,
        UsermanagementComponent,
        AddNewFileComponent,
        ImpressumComponent,
        AboutComponent,
        UserSettingsComponent,
        ArticleCreateComponent,
        RegionalGroupComponent,
        LatestNewsComponent,
        ArticleCardComponent,
        AddNewUserComponent
    ],
    imports: [
        MatProgressSpinnerModule,
        BrowserModule,
        AppRoutingModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatChipsModule,
        MatSortModule,
        MatPaginatorModule,
        HttpClientModule,
        MatToolbarModule,
        MatTableModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatExpansionModule,
        MatRippleModule,
        ReactiveFormsModule,
        FormsModule,
        MarkdownModule.forRoot(),
        MarkdownModule.forRoot({ loader: HttpClient }),
        LMarkdownEditorModule
    ],
    providers: [
        ArticleService,
        AuthenticationService,
        SuperuserService,
        FileService,
        DialogService,
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlDE },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddHeaderInterceptor,
            multi: true
        }
    ],
    entryComponents: [LoginTemplateComponent, ResetPasswordComponent, ConfirmTemplateComponent, EditTextComponent, AddNewUserComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
