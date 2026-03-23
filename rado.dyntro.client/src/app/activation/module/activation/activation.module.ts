import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivationRoutingModule } from '../activation/activation-routing.module';
import { ActivateAccountFormComponent } from '../../activate-account-form/activate-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivationService } from '../../services/activation.service';

@NgModule({
  declarations: [ActivateAccountFormComponent],
  imports: [
    CommonModule,
    ActivationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ActivationService],
})
export class ActivationModule { }
