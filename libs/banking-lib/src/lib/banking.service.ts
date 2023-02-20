import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { Account } from './types/Account';
import { AccountDTO } from './types/AccountDTO';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  // TODO make this configurable via injection token
  private baseUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  create(payload: Partial<AccountDTO>) {
    return this.http.post<Account>(`${this.baseUrl}/accounts`, {
      name: payload.name,
      adjustBalance: payload.adjustBalance,
    }).pipe(catchError((error) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000,
      });
      return of(null);
    }));
  }

  getAll() {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  update(id: number, payload: Partial<AccountDTO>) {
    return this.http.patch<Account>(`${this.baseUrl}/accounts/${id}`, {
      accountNumber: payload.accountNumber,
      adjustBalance: payload.adjustBalance,
    }).pipe(catchError((error) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000,
      });
      return of(null);
    }));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/accounts/${id}`).pipe(catchError((error) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000,
      });
      return of(null);
    }));
  }
}
