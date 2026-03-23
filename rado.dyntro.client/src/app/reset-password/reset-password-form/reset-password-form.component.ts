import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';
import { UserResetPassword } from '../../core/interfaces/UserResetPassword';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-form',
  standalone: false,
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css'
})
export class ResetPasswordFormComponent implements OnInit {

  user: Partial<UserResetPassword> = {
    token: '',
    newPassword: '',
  };

 
  countdown: number | null = null;
  tokenValid: boolean | null = null;


  fb = inject(FormBuilder);
  resetPasswordForm = this.fb.nonNullable.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.token = params['token'] || '';

      if (this.user.token) {
        this.resetPasswordService.validateResetPasswordToken(this.user.token).subscribe({
          next: () => {             
              this.tokenValid = true;     
          },
          error: () => {
            this.tokenValid = false;
            alert("Link jest nieaktywny lub wygasł.");
          }
        });
      }
    });
  }


  onSubmit(): void {
    const password = this.resetPasswordForm.value.password;
    const confirmPassword = this.resetPasswordForm.value.confirmPassword;

    if (password && password === confirmPassword) {
      const payload: UserResetPassword = {
        token: this.user.token || '',
        newPassword: password
      };
      this.resetPassword(payload);
    } else {
      alert("Hasła nie są takie same");
    }
  }

  resetPassword(payload: UserResetPassword): void {
    this.resetPasswordService.putResetPassword(payload).subscribe({
      next: () => {       
        this.startCountdown(5); 
      },
      error: (err) => {
        alert("Błąd podczas zmiany hasła: " + (err.error || err.message));
      }
    });
  }

  goToPage(): void {
    this.router.navigate(['/commercial/main']);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  startCountdown(seconds: number): void {
    this.countdown = seconds;
    const interval = setInterval(() => {
      if (this.countdown === null) {
        clearInterval(interval);
        return;
      }

      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(interval);
        this.goToPage();
        this.countdown = null;
      }
    }, 1000);
  }

}
