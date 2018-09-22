import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Bank } from '../../bank/bank';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  accountForm: FormGroup;
  banks: Bank[] = [];
  alerts: any[] = [];
  constructor(private accountService: AccountService, fb: FormBuilder, private router: Router) {
    this.accountForm = fb.group({
      accountBalance: [0, Validators.required],
      accountCurrency: ['USD', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountPin: ['', Validators.required],
      accountVerifyCode: ['', Validators.required],
      bank: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.accountService.getBanks().subscribe(
      b => this.banks = b,
      error => console.error(error)
    );
  }

  submit() {
    const bal: number = this.accountForm.get('accountBalance').value,
          cur: string = this.accountForm.get('accountCurrency').value,
          name: string = this.accountForm.get('accountName').value,
          accNum: string = this.accountForm.get('accountNumber').value,
          pin: string = this.accountForm.get('accountPin').value,
          verify: string = this.accountForm.get('accountVerifyCode').value,
          bk: string = this.accountForm.get('bank').value;
    this.accountService.save(
      bal,
      cur,
      name,
      accNum,
      pin,
      verify,
      bk
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
          this.router.navigate(['/accounts']);
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
