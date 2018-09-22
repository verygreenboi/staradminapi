import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bank, defaultBank } from '../bank';
import { BankService } from '../bank.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validation';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bkId: string;
  bank: Bank = defaultBank;
  alerts: any[] = [];
  words: any[] = ['H.S.B.C', 'h.s.b.s', 'HSBC', 'bank', 'Bank', 'BANK'];
  bankFromGroup: FormGroup;
  constructor(private route: ActivatedRoute, private bankService: BankService, fb: FormBuilder) {
    this.bkId = this.route.snapshot.params.id;
    this.bankFromGroup = fb.group({
      title: ['', [Validators.required, CustomValidators.blacklistWords(this.words)]],
      bkNum: ['', Validators.required],
      reNum: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.bankService.getBank(this.bkId).subscribe(
      b => {
        this.bankFromGroup.patchValue({
          title: b.title,
          bkNum: b.sim,
          reNum: b.redirect
        });
        this.bank = b;
      },
      err => console.error(err)
    );
  }

  submit() {
    const title = this.bankFromGroup.get('title').value;
    const redirect = this.bankFromGroup.get('reNum').value;

    this.bankService.save(title, redirect, this.bank).subscribe(
      lStatus => {
        if (lStatus.status === 0) {
          this.alerts.push({
            type: 'info',
            msg: `Saving bank. Please wait...`,
            timeout: 5000,
            dismissible: false
          });
        } else if (lStatus.status === 1) {
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
