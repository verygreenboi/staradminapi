import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account.class';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(
      acc => this.accounts = acc,
      err => console.error(err)
    );
  }

}
