import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    CommonModule,
    RouterModule
  ],
  declarations: [AuthLayoutComponent, DashLayoutComponent, ToolbarComponent, SidebarComponent, FooterComponent],
  exports: [AuthLayoutComponent, DashLayoutComponent]
})
export class SharedModule { }
