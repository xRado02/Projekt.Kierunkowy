import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialRoutingModule } from './commercial-routing.module';
import { CommercialComponent } from '../../commercial.component';
import { SectionLoginComponent } from '../../components/main/section-login/section-login.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SectionSendResetLinkComponent } from '../../components/main/section-send-reset-link/section-send-reset-link.component';


@NgModule({
  declarations: [
    CommercialComponent,
    SectionLoginComponent,
    SectionSendResetLinkComponent
  ],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    CommercialComponent,
    SectionLoginComponent,
    
  
  ]

})
export class CommercialModule { }
