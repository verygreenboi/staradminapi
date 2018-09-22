import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ParseService } from './parse.service';

@Injectable({
  providedIn: 'root'
})
export class NavControllerService {
  isBanksCollapsed = true;
  isAccountsCollapsed = false;

  bankCollapesSubject: Subject<Boolean> = Subject.create();
  accountCollapseSubject: Subject<Boolean> = Subject.create();

  accountCollapse = this.accountCollapseSubject.asObservable();
  bankCollapse = this.bankCollapesSubject.asObservable();
  constructor(private ps: ParseService) { }

  status() {
    this.bankCollapesSubject.next(this.isBanksCollapsed);
    this.bankCollapesSubject.next(this.isAccountsCollapsed);
  }

  toggleBank() {
    this.isBanksCollapsed = !this.isBanksCollapsed;
    this.bankCollapesSubject.next(this.isBanksCollapsed);
    if (!this.isAccountsCollapsed) {
      this.accountCollapseSubject.next(true);
    }
  }

  toggleAccount() {
    this.isAccountsCollapsed = !this.isAccountsCollapsed;
    this.bankCollapesSubject.next(this.isAccountsCollapsed);
    if (!this.isBanksCollapsed) {
      this.bankCollapesSubject.next(true);
    }
  }

  logout() {
    this.ps.logout();
  }
}
