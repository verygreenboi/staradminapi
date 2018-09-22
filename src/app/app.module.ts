import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ParseService } from './parse.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { NavControllerService } from './nav-controller.service';
import { AuthGuard } from './authentication/auth.guard';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [BrowserModule, routing, SharedModule],
  providers: [ParseService, NavControllerService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
