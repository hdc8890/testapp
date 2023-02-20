import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../Account';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'radancytestapp-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent {
  constructor(public dialog: MatDialog) { }
  title = 'Accounts';

  // TODO implement API calls

  accounts = [
    {
      id: 1,
      name: 'Checking',
      accountNumber: '123456789',
      balance: 1000,
      transactions: [
        {
          id: 1,
          date: '2020-01-01',
          description: 'Paycheck',
          amount: 1000,
        },
        {
          id: 2,
          date: '2020-01-02',
          description: 'Groceries',
          amount: -100,
        }
      ]
    },
    {
      id: 2,
      name: 'Savings',
      accountNumber: '123456789',
      balance: 2000,
      transactions: [
        {
          id: 1,
          date: '2020-01-01',
          description: 'Paycheck',
          amount: 2000
        },
        {
          id: 2,
          date: '2020-01-02',
          description: 'Groceries',
          amount: -100
        }
      ]
    }
  ];

  createAccount() {
    const dialogRef = this.dialog.open(DialogComponent<Account>, {
      data: { action: 'create', title: 'New Account Name'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.accounts.push({
        id: 3,
        name: 'New Account',
        accountNumber: '123456789',
        balance: 1000,
        transactions: [
          {
            id: 1,
            date: '2020-01-01',
            description: 'Paycheck',
            amount: 1000
          },
          {
            id: 2,
            date: '2020-01-02',
            description: 'Groceries',
            amount: -100
          }
        ]
      });
    });
  }

  deleteAccount(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'delete', title: 'Are you sure about deleting this account?', hideInput: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Account deleted');
      console.log(result);
    });
  }
  
  withdraw(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'withraw', title: 'Amount to withdraw' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Withdrew $${result} from account ${id}`);
      console.log(result);
    });
  }

  deposit(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'deposit', title: 'Amount to deposit' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Deposited $${result} to account ${id}`);
      console.log(result);
    });
  }
}
