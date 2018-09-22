import { Component, OnInit } from '@angular/core';
import { NavControllerService } from '../../nav-controller.service';
import { ParseService } from '../../parse.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isBanksCollapsed = true;
  isAccountsCollapsed = false;

  user = this.parseService.getCurrentUser();
  hasUser = this.user != null;
  email = this.user.getEmail();

  constructor(private ncs: NavControllerService, private parseService: ParseService) { }

  ngOnInit() {
  }

  toggleAccounts() {
    this.isAccountsCollapsed = !this.isAccountsCollapsed;
    if (!this.isBanksCollapsed) {
      this.isBanksCollapsed = true;
    }
  }

  toggleBanks() {
    this.isBanksCollapsed = !this.isBanksCollapsed;
    if (!this.isAccountsCollapsed) {
      this.isAccountsCollapsed = true;
    }
  }

}
