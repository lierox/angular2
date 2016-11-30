import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { SortablejsModule } from 'angular-sortablejs';
import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { COMMENTS_DECLARATIONS } from './comments';
import { TASKS_DECLARATIONS } from './tasks';
import { USERS_DECLARATIONS } from './users';
import { AUTH_DECLARATIONS } from './auth';
import { IMAGES_DECLARATIONS } from './images';
import { FileDropModule } from "angular2-file-drop";
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';
//import { AUTH_DECLARATIONS } from './login';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    SortablejsModule,
    FileDropModule
  ],
  declarations: [
    AppComponent,
    ...COMMENTS_DECLARATIONS,
    ...TASKS_DECLARATIONS,
    ...USERS_DECLARATIONS,
    ...AUTH_DECLARATIONS,
    ...IMAGES_DECLARATIONS,
    TranslatePipe
  ],
  providers: [
    ...ROUTES_PROVIDERS,
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
