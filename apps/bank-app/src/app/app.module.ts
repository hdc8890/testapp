import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BankingModule } from '@banking-lib';
import { SignInModule } from '@sign-in-lib';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    SignInModule,
    BankingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
