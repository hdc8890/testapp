import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedUser } from './AuthenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class SignInServiceService {
  // TODO make this configurable via injection token
  private baseUrl = 'http://localhost:3333/api/v1';

  constructor(private http: HttpClient) { }

  signIn() {
    return this.http.post<AuthenticatedUser>(`${this.baseUrl}/signin`, {
      email: '',
      password: '',
    });
  }
}
