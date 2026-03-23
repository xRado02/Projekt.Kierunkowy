import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../../core/services/auth-user.service';
import { UserAuth } from '../../../../core/interfaces/UserAuth';

@Component({
  selector: 'app-section-login',
  standalone: false,

  templateUrl: './section-login.component.html',
  styleUrl: './section-login.component.css'
})
export class SectionLoginComponent {
  constructor(private router: Router, private authService: AuthUserService) { }

  isLoading = false;
  loginError = false;
  formSubmitted = false;

  fb = inject(FormBuilder);
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (sessionStorage.getItem('accessToken')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.loginError = false;

    if (this.loginForm.valid) {
      this.loadAuthUser();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loadAuthUser(): void {
    this.isLoading = true;

    this.authService.loginUser(this.loginForm.value as UserAuth).subscribe({
      next: (response) => {
        this.isLoading = false;
        sessionStorage.setItem('accessToken', response.accesToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.isLoading = false;
        this.loginError = true;
        this.loginForm.patchValue({ password: '' });
      },
    });
  }
}
