import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../../payment/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  loadWalletForm: FormGroup;
  alerts: any[] = [];
  credits = 0;
  constructor(private paymentService: PaymentService, private router: Router, fb: FormBuilder) {
    this.loadWalletForm = fb.group({
      amount: [20, Validators.required]
    });
  }

  ngOnInit() {
    this.paymentService.parseService.getCredits().subscribe(
      c => this.credits = c,
      err => console.error(err)
    );
  }

  submit() {
    const amount: number = parseInt(this.loadWalletForm.get('amount').value, 10);
    this.paymentService.createWalletPayment(amount).subscribe(
      payment => this.router.navigate(['wallet/load-wallet', payment.objectId]),
      err => console.error(err)
    );
  }

}
