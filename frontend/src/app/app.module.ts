import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header/header.component';
import { LoginComponent } from './base/header/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { DialogService } from './services/dialog.service';
import { ArticleService } from './services/items/article.service';
import { FileService } from './services/items/file.service';
import { AddHeaderInterceptor } from './shared/header.interceptor';
import { LoginTemplateComponent } from './template/login/login-template.component';
import { ResetPasswordComponent } from './template/reset-password/reset-password.component';


@NgModule({
    declarations: [AppComponent, HeaderComponent, LoginComponent, LoginTemplateComponent, ResetPasswordComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatMenuModule,
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
        ReactiveFormsModule
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
    entryComponents: [LoginTemplateComponent, ResetPasswordComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
