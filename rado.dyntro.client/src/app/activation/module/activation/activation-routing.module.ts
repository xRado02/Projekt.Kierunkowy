import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountFormComponent } from '../../activate-account-form/activate-account-form.component';



const routes: Routes = [

  {
    path: '',
    component: ActivateAccountFormComponent,
    children: [
      { path: '', redirectTo: 'activation', pathMatch: 'full' },
         
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
