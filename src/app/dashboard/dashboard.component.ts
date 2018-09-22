import { Component, OnInit } from '@angular/core';
import { ParseService, defaultDashboardData } from '../parse.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData = defaultDashboardData;

  constructor(private parseService: ParseService) { }

  ngOnInit() {
    this.parseService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
      },
      error => console.error(error)
    );
  }

}
