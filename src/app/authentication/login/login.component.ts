import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParseService, ParseLoginResponse } from '../../parse.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alerts: any[] = [];
  loginForm: FormGroup;
  constructor(private parseService: ParseService, private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  status = -1;

  ngOnInit() {}

  handleError(err: any): any {
    this.alerts.push({
      type: 'danger',
      msg: `${this.getErrorMessage(err.message)}`,
      timeout: 15000,
      dismissible: true
    });
  }
  getErrorMessage(message: any): string {
    if (message === 'XMLHttpRequest failed: "Unable to connect to the Parse API"') {
      return 'Unable to connect to the our servers. Please try again.';
    } else if (message === 'Invalid username/password.') {
      return 'Invalid email/password';
    } else {
      return message;
    }
  }

  handleStatus(status: ParseLoginResponse) {
    this.status = status.status;
    if (status.status === 0) {
      this.alerts.push({
        type: 'info',
        msg: `Logining in. Please wait...`,
        timeout: 5000,
        dismissible: false
      });
    } else if (status.status === 1) {
      location.href = '/';
    }
  }

  submit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.alerts = [];
    this.parseService.login(username, password).subscribe(
      status => this.handleStatus(status),
      err => this.handleError(err)
    );
  }

}
