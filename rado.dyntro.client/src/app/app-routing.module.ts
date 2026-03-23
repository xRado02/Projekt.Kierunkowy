import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '/commercial', pathMatch: 'full' },
  { path: 'commercial', loadChildren: () => import('./commercial/modules/commercial/commercial.module').then(m => m.CommercialModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'activation', loadChildren: () => import('./activation/module/activation/activation.module').then(m => m.ActivationModule) },
  { path: 'reset-password', loadChildren: () => import('./reset-password/modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: '**', redirectTo: '/commercial', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
