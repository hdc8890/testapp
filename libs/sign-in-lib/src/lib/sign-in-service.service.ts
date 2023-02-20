import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { AuthenticatedUser } from './AuthenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class SignInServiceService {
  // TODO make this configurable via injection token
  private baseUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  signIn( email: string, password: string) {
    return this.http.post<AuthenticatedUser>(`${this.baseUrl}/auth/signin`, {
      email: email,
      password: password,
    }).pipe(catchError((error) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000,
      });
      return of(null);
    }));
  }
}
