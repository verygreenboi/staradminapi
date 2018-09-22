import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bank';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  banks: Bank[] = [];
  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.bankService.getBanks().subscribe(
      b => this.banks = b,
      err => console.error(err)
    );
  }

}
