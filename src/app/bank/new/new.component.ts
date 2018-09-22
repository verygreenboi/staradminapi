import { Component, OnInit } from '@angular/core';
import { ParseService } from '../../parse.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validation';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewBankComponent implements OnInit {
  user = this.parseService.getCurrentUser();
  credits = 0;
  newBankForm: FormGroup;
  alerts: any[] = [];
  words: any[] = ['H.S.B.C', 'h.s.b.s', 'HSBC', 'bank', 'Bank', 'BANK'];
  constructor(private parseService: ParseService, fb: FormBuilder, private router: Router) {
    this.newBankForm = fb.group({
      title: ['', [Validators.required, CustomValidators.blacklistWords(this.words)]],
      reNum: ['', Validators.required],
      region: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.parseService.getCredits().subscribe(
      c => this.credits = c,
      err => console.error(err)
    );
  }

  submit() {
    const title = this.newBankForm.get('title').value;
    const redirect = this.newBankForm.get('reNum').value;
    const region = this.newBankForm.get('region').value;
    const greetings = `Welcome to ${title} Phone banking system`;

    const bank = new Parse.Object('Bank');
    bank.set('title', title);
    bank.set('redirect', redirect);
    bank.set('region', region);
    bank.set('greetings', greetings);

    this.parseService.save(bank).subscribe(
      _ => this.router.navigate(['/banks']),
      err => console.error(err)
    );
  }

}
