import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordFormComponent } from '../../reset-password-form/reset-password-form.component';

const routes: Routes = [

  {
    path: '',
    component: ResetPasswordFormComponent,
    children: [
      { path: '', redirectTo: 'reset-password', pathMatch: 'full' },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
