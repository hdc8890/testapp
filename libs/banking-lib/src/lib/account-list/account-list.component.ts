import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BankingService } from '../banking.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Account } from '../types/Account';
import { Action } from "../types/Action";

@Component({
  selector: 'radancytestapp-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, private bankingService: BankingService) { }
  title = 'Accounts';
  accounts$: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);
  subscriptions: Subscription[] = [];

  // TODO implement API calls

  ngOnInit(): void {
    this.subscriptions.push(
      this.bankingService.getAll().subscribe((accounts) => {
        this.accounts$.next(accounts);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  handleAccountAction(action: Action, payload: { id?: number, amount?: number, name?: string, accountNumber?: string }) {
    // TODO implement state management move all of this to a reducer
    switch (action) {
      case Action.Create:
        if (!payload.name) return;
        this.bankingService.create({ name: payload.name, adjustBalance: payload.amount }).subscribe((account) => {
          if (account) this.accounts$.next([...this.accounts$.value, account]);
        });
        break;
      case Action.Delete:
        if (!payload.id) return;
        this.bankingService.delete(payload.id).subscribe((account) => {
          this.accounts$.next(this.accounts$.value.filter((account) => account.id !== payload.id));
        });
        break;
      case Action.Withdraw:
        if (!payload.id || !payload.amount) return;
        this.bankingService.update(payload.id, { accountNumber: payload.accountNumber, adjustBalance: -payload.amount }).subscribe((updatedAccount) => {
          if (updatedAccount)
          this.accounts$.next(this.accounts$.value.map((account) => {
            if (account.id === updatedAccount.id) {
              return { ...account, balance: updatedAccount.balance }
            }
            return account;
          }));
        });
        break;
      case Action.Deposit:
        if (!payload.id || !payload.amount) return;
        this.bankingService.update(payload.id, { accountNumber: payload.accountNumber, adjustBalance: payload.amount }).subscribe((updatedAccount) => {
          if(updatedAccount)
          this.accounts$.next(this.accounts$.value.map((account) => {
            if (account.id === updatedAccount.id) {
              return { ...account, balance: updatedAccount.balance }
            }
            return account;
          }
          ));
        });
        break;
      default:
        break;
    }
  }

  handleDialog(action: Action | string, id?: number, accountNumber?: string) {
    let message = '';
    let hideInput = false;
    switch (action) {
      case Action.Create:
        message = 'New Account Name';
        break;
      case Action.Delete:
        message = 'Are you sure about deleting this account?';
        hideInput = true;
        break;
      case Action.Withdraw:
        message = 'Amount to withdraw';
        break;
      case Action.Deposit:
        message = 'Amount to deposit';
        break;
      default:
        break;
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message: message, hideInput: hideInput },
    });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        console.log(`The dialog was closed with ${result} and action ${action} and accountNumber ${accountNumber}`);
        this.handleAccountAction(action as Action, { id: id, amount: parseInt(result), name: result, accountNumber: accountNumber })
      })
    )
  }
}
