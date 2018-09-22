import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from '../../payment/payment.service';
import { WalletPayment } from '../../payment/payment';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, flatMap } from 'rxjs/operators/';

@Component({
  selector: 'app-load-wallet',
  templateUrl: './load-wallet.component.html',
  styleUrls: ['./load-wallet.component.css']
})
export class LoadWalletComponent implements OnInit, OnDestroy {
  id: string = this.route.snapshot.params.id;
  payment: Observable<WalletPayment> = this.paymentService.getWalletPayment(this.id);
  sub: Subscription;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private router: Router) { }

  ngOnInit() {
    this.sub = this.paymentService.walletLive(this.id).pipe(
      flatMap(_ => this.paymentService.getWalletPayment(this.id)),
      filter(pay => pay.status === 3 || pay.status === -1)
    ).subscribe(
      pay => this.updatePayStatus(pay.status),
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updatePayStatus(status: number) {
    if (status === 3) {
      this.router.navigate(['/']);
    }
  }

}
