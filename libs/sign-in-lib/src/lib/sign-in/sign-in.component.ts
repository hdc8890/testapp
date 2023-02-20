import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthenticatedUser } from '../AuthenticatedUser';
import { SignInServiceService } from '../sign-in-service.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hidePassword = true;
  @Output() signedIn = new EventEmitter<AuthenticatedUser>();

  constructor(private signInService: SignInServiceService) { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signIn() {
    // TODO implement when API is running
    // this.signInService.signIn().pipe(tap((user) => this.signedIn.emit(user)));
    this.signedIn.emit({
      email: '',
      token: '',
      expiry: 123,
      refreshToken: '',
    });
  }
}

