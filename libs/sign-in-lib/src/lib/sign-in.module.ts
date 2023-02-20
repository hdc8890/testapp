import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule, FormsModule, BrowserAnimationsModule, MatButtonModule, MatCardModule, HttpClientModule],
  declarations: [SignInComponent], // TODO implement forgot password and register user.
  exports: [SignInComponent]
})

/**
 * Now you can really make the argument that this is over engineering, because this module only contains a single component.
 *
 * Is it worth doing this for a single component and at this stage of the project?
 * Would it not make more sense to wait until there is a case to resuse the component?
 */
export class SignInModule { }
