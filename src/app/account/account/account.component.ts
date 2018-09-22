import { Component, OnInit } from '@angular/core';
import { Account } from '../account.class';
import { defaultAccount, AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accId: string;
  account: Account = defaultAccount;
  accountForm: FormGroup;
  alerts: any[] = [];
  constructor(private route: ActivatedRoute, private accountService: AccountService, fb: FormBuilder) {
    this.accId = this.route.snapshot.params.id;

    this.accountForm = fb.group({
      accountBalance: [0, Validators.required],
      accountCurrency: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountPin: ['', Validators.required],
      accountVerifyCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.accountService.getAccount(this.accId).subscribe(
      acc => {
        this.accountForm.patchValue({
          accountBalance: acc.accountBalance,
          accountCurrency: acc.accountCurrency,
          accountName: acc.accountName,
          accountNumber: acc.accountNumber,
          accountPin: acc.accountPin,
          accountVerifyCode: acc.accountVerifyCode
        });
      }
    );
  }

  submit() {
    this.accountService.update(
      this.accId,
      this.accountForm.get('accountBalance').value,
      this.accountForm.get('accountCurrency').value,
      this.accountForm.get('accountName').value,
      this.accountForm.get('accountNumber').value,
      this.accountForm.get('accountPin').value,
      this.accountForm.get('accountVerifyCode').value,
    ).subscribe(
      stat => {
        if (stat.status === 0) {
          this.alerts.push({
            type: 'info',
            msg: `Saving account. Please wait...`,
            timeout: 5000,
            dismissible: false
          });
        } else if (stat.status === 1) {
          this.alerts = [];
          this.alerts.push({
            type: 'success',
            msg: `Done.`,
            dismissible: true
          });
        }
      },
      err => {
        this.alerts = [];
        this.alerts.push({
          type: 'danger',
          msg: err.message,
          timeout: 15000,
          dismissible: true
        });
      }
    );
  }

}
