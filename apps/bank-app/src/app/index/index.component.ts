import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser } from '@sign-in-lib';

@Component({
  selector: 'radancytestapp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  constructor(private router: Router) {}
  handleSignIn(user: AuthenticatedUser) {
    console.log('handleSignIn', user)
    this.router.navigateByUrl('/accounts');
  }
}
