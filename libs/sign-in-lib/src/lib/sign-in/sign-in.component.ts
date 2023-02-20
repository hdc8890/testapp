import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticatedUser } from '../AuthenticatedUser';
import { SignInServiceService } from '../sign-in-service.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  hidePassword = true;
  subscriptions: Subscription[] = [];
  @Output() signedIn = new EventEmitter<AuthenticatedUser>();

  constructor(private signInService: SignInServiceService) { }

  signIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (!email || !password) {
      return;
    }
    this.subscriptions.push(
      this.signInService.signIn(email, password).subscribe((user) => {
        if (user) {
          this.signedIn.emit(user);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

