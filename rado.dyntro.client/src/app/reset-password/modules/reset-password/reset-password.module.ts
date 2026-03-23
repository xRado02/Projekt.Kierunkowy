import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordFormComponent } from '../../reset-password-form/reset-password-form.component';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ResetPasswordFormComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule { }
