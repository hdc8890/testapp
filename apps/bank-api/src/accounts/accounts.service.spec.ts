import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { AccountEntity } from './account.entity';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of accounts', () => {
    expect(service.getAllAsync()).toBeInstanceOf(Observable<AccountEntity[]>);
  });
  it('should return a single account', () => {
    expect(service.getAsync('1')).toBeInstanceOf(Observable<AccountEntity>);
  });
  it('should return a new account', () => {
    expect(service.createAsync({})).toBeInstanceOf(Observable<AccountEntity>);
  });
  it('should return an updated account', () => {
    expect(service.updateOne({ name: 'Checking+', accountNumber: '123456789' })).toHaveProperty('name', 'Checking+');
  });
  it('should not update an account if too much money is deposited', () => {
    let err;
    try {
      service.updateOne({ adjustBalance: 10001, accountNumber: '123456789' });
    } catch (error) {
      console.log(error.response);
      err = error;
    }
    expect(err).toBeInstanceOf(BadRequestException);
  });
  it('should not update an account if the balance drops below 100', () => {
    let err;
    try {
      service.updateOne({ adjustBalance: -4901, accountNumber: '123456789' });
    } catch (error) {
      console.log(error.response);
      err = error;

    }
    expect(err).toBeInstanceOf(BadRequestException);
  });
  it('should not update an account if you attempt to withdraw more than 90% of the balance', () => {
    let err;
    try {
      service.updateOne({ adjustBalance: -4900, accountNumber: '123456789' });
    } catch (error) {
      console.log(error.response);
      err = error;
    }
    expect(err).toBeInstanceOf(BadRequestException);
  });
  it('should return a deleted account', () => {
    expect(service.deleteAsync('1')).toBeInstanceOf(Observable<void>);
  });
});
