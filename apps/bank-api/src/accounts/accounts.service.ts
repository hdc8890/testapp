import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountEntity } from './account.entity';
import { AccountDTO } from './account.interface';

/**
 * Write business logic here
 */
@Injectable()
export class AccountsService extends InMemoryDBService<AccountEntity> {
    constructor() {
        super({ featureName: 'accounts' });
        // mock some data for testing
        this.createMany([{
            id: '1',
            name: 'Checking',
            balance: 5000,
            accountNumber: '123456789',
            userId: '1'
        }, {
            id: '2',
            name: 'Savings',
            balance: 40000,
            accountNumber: '987654321',
            userId: '1'
        }, {
            id: '3',
            name: 'Checking',
            balance: 2000,
            accountNumber: '1234567890',
            userId: '2'
        }, {
            id: '4',
            name: 'Savings',
            balance: 25000,
            accountNumber: '0987654321',
            userId: '2'
        },
        {
            id: '5',
            name: 'Joint Checking',
            balance: 7000,
            accountNumber: '1234567891',
            userId: '1'
        }
        ]
        )
    }
    getAsync(id: string) {
        return super.getAsync(id)
    }

    getAllAsync(): Observable<AccountEntity[]> {
        return super.getAllAsync();
    }

    createAsync(payload: Partial<AccountDTO>): Observable<AccountEntity> {
        const newRecord: AccountEntity = {
            id: Math.floor(Math.random()).toString(), // real databases would use a uuid
            name: payload.name,
            balance: 100, // accounts cannot be created with a balance of less than 100
            accountNumber: Math.floor(Math.random() * 1000000000).toString(), // real banks would use a more secure method of generating account numbers
            userId: '1' // for security reasons you would normally pull the userid from the token but for the sake of this demo we will just use the first user
        }
        return super.createAsync(newRecord);
    }

    updateOne(payload: Partial<AccountDTO>) {
        // this in memory database does not support transactions
        // so we will have to do some validation here by querying the database first
        // TODO: centralize error strings in a constants file for easier maintenance and translation.
        const account = super.query((record: AccountEntity) => record.accountNumber === payload.accountNumber)[0]; // queries always returns an array so we will just take the first item because we are assuming that the account number is unique
        if (!account) {
            throw new BadRequestException('Account not found.');
        }
        if (payload.adjustBalance > 10000) {
            throw new BadRequestException('You cannot deposit more than $10,000 in a single transaction.');
        }
        const newbalance = account.balance + payload.adjustBalance;
        if (newbalance < 100) {
            throw new BadRequestException('You cannot have an account balance of less than $100.');
        }
        if ((newbalance / account.balance) * 100 < 10) {
            throw new BadRequestException('You cannot withdraw more than 90% of your account balance in a single transaction.');
        }
        account.balance = newbalance;
        account.name = payload.name;
        super.update(account);
        return super.get(account.id);
    }

    deleteAsync(id: string): Observable<void> {
        return super.deleteAsync(id);
    }
}
