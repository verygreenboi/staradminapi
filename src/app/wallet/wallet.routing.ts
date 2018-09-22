import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashLayoutComponent } from '../shared/dash-layout/dash-layout.component';
import { OverviewComponent } from './overview/overview.component';
import { LoadBankComponent } from './load-bank/load-bank.component';
import { LoadWalletComponent } from './load-wallet/load-wallet.component';

export const routes: Routes = [
  {
    path: '',
    component: DashLayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'load-bank/:id',
        component: LoadBankComponent
      },
      {
        path: 'load-wallet/:id',
        component: LoadWalletComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
