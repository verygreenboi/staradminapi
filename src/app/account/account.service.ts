import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParseService } from '../parse.service';
import { Account } from './account.class';
import { map, flatMap, startWith, toArray } from 'rxjs/operators';
import { Bank, defaultBank } from '../bank/bank';

export const defaultAccount: Account = {
  objectId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  accountBalance: 0,
  accountCurrency: 'USD',
  accountName: '',
  accountNumber: '',
  accountPin: '',
  accountVerifyCode: '',
  bank: defaultBank
};

export interface AccountSaveResponse {
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private parseService: ParseService) { }

  getAccounts(): Observable<Account[]> {
    return this.parseService.getAccounts().pipe(
      flatMap(accounts => accounts),
      map(account => this.parseAccount(account)),
      toArray(),
      startWith([])
    );
  }

  getAccount(accId: string): Observable<Account> {
    return this.parseService.getAccount(accId).pipe(
      map(acc => this.parseAccount(acc)),
      startWith(defaultAccount)
    );
  }

  getBanks(): Observable<Bank[]> {
    return this.parseService.getBanks(true).pipe(
      flatMap(banks => banks),
      map(bank => this.getLocalBank(bank)),
      toArray(),
      startWith([])
    );
  }

  parseAccount(account: Parse.Object): Account {
    return {
      objectId: account.id,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      accountName: account.has('name') ? account.get('name') : '',
      accountBalance: account.has('bal') ? account.get('bal') : 0,
      accountCurrency: account.has('currency') ? account.get('currency') : 'USD',
      accountNumber: account.has('accNum') ? account.get('accNum') : '',
      accountPin: account.has('pin') ? account.get('pin') : '',
      accountVerifyCode: account.has('verify') ? account.get('verify') : '',
      bank: account.has('bk') ? this.getLocalBank(account.get('bk')) : null,
    };
  }

  save(
    bal: number,
    cur: string,
    name: string,
    accNum: string,
    pin: string,
    verify: string,
    bk: string
    ): Observable<AccountSaveResponse> {
    const acc = new Parse.Object('Account');
    const bank = new Parse.Object('Bank');
    bank.id = bk;
    acc.set('name', name);
    acc.set('currency', cur);
    acc.set('bal', bal);
    acc.set('accNum', accNum);
    acc.set('pin', pin);
    acc.set('verify', verify);
    acc.set('bk', bank);
    return this.parseService.save(acc).pipe(
      map(_ => {
        return { status: 1 };
      }),
      startWith({status: 0})
    );
  }

  update(
    accId: string,
    bal: number,
    cur: string,
    name: string,
    accNum: string,
    pin: string,
    verify: string
  ): Observable<AccountSaveResponse> {
    const acc = new Parse.Object('Account');
    acc.id = accId;
    acc.set('name', name);
    acc.set('currency', cur);
    acc.set('bal', bal);
    acc.set('accNum', accNum);
    acc.set('pin', pin);
    acc.set('verify', verify);
    return this.parseService.save(acc).pipe(
      map(_ => {
        return { status: 1 };
      }),
      startWith({status: 0})
    );
  }

  getLocalBank(_bank: Parse.Object): Bank {
    return {
      objectId: _bank.id,
      createdAt: _bank.createdAt,
      updatedAt: _bank.updatedAt,
      title: _bank.get('title'),
      greetings: _bank.get('greetings'),
      sim: _bank.get('sim'),
      redirect: _bank.get('redirect'),
      credit: _bank.get('credit'),
      isActive: _bank.has('isActive') ? _bank.get('isActive') : false
    };
  }
}
