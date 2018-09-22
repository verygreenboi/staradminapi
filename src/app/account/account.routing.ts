import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { DashLayoutComponent } from '../shared/dash-layout/dash-layout.component';
export const routes: Routes = [
  {
    path: '',
    component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: AccountsComponent
      },
      {
        path: 'account/:id',
        component: AccountComponent
      },
      {
        path: 'new',
        component: NewAccountComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
