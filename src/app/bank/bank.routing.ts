import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashLayoutComponent } from '../shared/dash-layout/dash-layout.component';
import { BanksComponent } from './banks/banks.component';
import { BankComponent } from './bank/bank.component';
import { NewBankComponent } from './new/new.component';

export const routes: Routes = [
  {
    path: '',
    component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: BanksComponent
      },
      {
        path: 'bank/:id',
        component: BankComponent
      },
      {
        path: 'new',
        component: NewBankComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
