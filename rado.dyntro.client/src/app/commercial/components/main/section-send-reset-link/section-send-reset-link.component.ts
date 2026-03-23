import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../dashboard/models/user/user-model';
import { UserService } from '../../../../dashboard/Services/user.service';
import { AuthUserService } from '../../../../core/services/auth-user.service';
import { UserResetPassword } from '../../../../core/interfaces/UserResetPassword';

@Component({
  selector: 'app-section-send-reset-link',
  standalone: false,
  
  templateUrl: './section-send-reset-link.component.html',
  styleUrl: './section-send-reset-link.component.css'
})
export class SectionSendResetLinkComponent {

  constructor(private userService: AuthUserService) { }

 

  fb = inject(FormBuilder);
  resetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const user: Partial<UserResetPassword> = {
        email: this.resetPasswordForm.value.email
      };
      this.sendResetEmail(user);
    } else {
      console.warn("Formularz jest nieprawidłowy");
    }
  }
  
  sendResetEmail(user: Partial<UserResetPassword>): void {
    this.userService.sendResetEmail(user).subscribe({
      next: (response) => {
        alert("Wysłano maila");
      },
      error: (error) => {
        console.error("Błąd przy wysłaniu zaproszenia");
        console.log("Szczegóły błędu:", error.error.errors);
      }
    })
  }
}


