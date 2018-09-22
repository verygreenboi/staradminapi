import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank, defaultBank } from './bank';
import { map, flatMap, toArray, startWith } from 'rxjs/operators';
import { ParseService } from '../parse.service';

export interface BankSaveResponse {
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class BankService {
  save(title: string, redirect: string, bank: Bank): Observable<BankSaveResponse> {
    const _bank = new Parse.Object('Bank');
    const greetings = `Welcome to ${title} Phone banking system`;
    _bank.id = bank.objectId;
    _bank.set('title', title);
    _bank.set('redirect', redirect);
    _bank.set('greetings', greetings);
    return this.parseService.save(_bank).pipe(
      map(s => {
        return {
          status: 1
        };
      }),
      startWith({status: 0})
    );
  }

  constructor(private parseService: ParseService) { }

  getBanks(): Observable<Bank[]> {
    return this.parseService.getBanks().pipe(
      flatMap((banks) => banks),
      map(bank => this.getLocalBank(bank)),
      toArray(),
      startWith([])
    );
  }

  getBank(id: string): Observable<Bank> {
    return this.parseService.getBank(id).pipe(
      map(b => this.getLocalBank(b)),
      startWith(defaultBank)
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
