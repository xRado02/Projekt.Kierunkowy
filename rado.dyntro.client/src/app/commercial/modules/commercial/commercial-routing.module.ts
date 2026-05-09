import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialComponent } from '../../commercial.component';
import { MainComponent } from '../../components/main/main.component';
import { SectionLoginComponent } from '../../components/main/section-login/section-login.component';
import { SectionSendResetLinkComponent } from '../../components/main/section-send-reset-link/section-send-reset-link.component';



const routes: Routes = [

  {
    path: '',
    component: CommercialComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SectionLoginComponent },
      { path: 'send-reset-email', component: SectionSendResetLinkComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule { }
