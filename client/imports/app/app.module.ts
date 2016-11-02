import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';


import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { COMMENTS_DECLARATIONS } from './comments';
import { TASKS_DECLARATIONS } from './tasks';
import { USERS_DECLARATIONS } from './users';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule
  ],
  declarations: [
    AppComponent,
    ...COMMENTS_DECLARATIONS,
    ...TASKS_DECLARATIONS,
    ...USERS_DECLARATIONS
  ],
  providers: [
    ...ROUTES_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
