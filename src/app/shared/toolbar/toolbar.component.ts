import { Component, OnInit } from '@angular/core';
import { ParseService } from '../../parse.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user = this.parseService.getCurrentUser();
  hasUser = this.user != null;
  email = this.user.getEmail();

  constructor(private parseService: ParseService) { }

  ngOnInit() {
  }

  logout() {
    this.parseService.logout();
  }

}
