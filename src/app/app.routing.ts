import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashLayoutComponent } from './shared/dash-layout/dash-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth.guard';
import { PasswordComponent } from './profile/password/password.component';

export const routes: Routes = [
  {
    path: '',
    component: DashLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ],
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'accounts',
    loadChildren: './account/account.module#AccountModule',
    canLoad: [
      AuthGuard
    ]
  },
  {
    path: 'banks',
    loadChildren: './bank/bank.module#BankModule',
    canLoad: [
      AuthGuard
    ]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canLoad: [
      AuthGuard
    ]
  },
  {
    path: 'wallet',
    loadChildren: './wallet/wallet.module#WalletModule',
    canLoad: [
      AuthGuard
    ]
  },
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
