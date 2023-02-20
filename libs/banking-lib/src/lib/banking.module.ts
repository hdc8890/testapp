import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  declarations: [
    AccountListComponent,
    DialogComponent,
  ],
  exports: [],
})

/**
 * Having a module for each library is a good practice.
 * It allows us to import the module in the app module and use the library's components.
 *
 * It also makes the library's components loosely coupled to the app module.
 * It also introduces a separation of concerns, by clearly defining the domain of the library.
 *
 * However you might be asking is this really necessary? Is it over engineering?
 *
 * Think about it this way, if you at any point in the future decide to reuse any of the components in another app,
 * You have to decouple the resued parts and then you should compare how much effort will be required to refactor the code then and now.
 */
export class BankingModule {}
