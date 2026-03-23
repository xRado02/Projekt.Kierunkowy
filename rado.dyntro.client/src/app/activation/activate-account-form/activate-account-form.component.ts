import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserActivate } from '../models/UserActivate'
import { ActivationService } from '../services/activation.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate-account-form',
  standalone: false,

  templateUrl: './activate-account-form.component.html',
  styleUrl: './activate-account-form.component.css'
})
export class ActivateAccountFormComponent implements OnInit {

  user: Partial<UserActivate> = {
    id: '',
    email: '',
    password: '',
    isActivated: false
  };

  fb = inject(FormBuilder);
  registerForm = this.fb.nonNullable.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  constructor(private activationService: ActivationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.id = params['id'];
      this.user.email = params['email'];
    })
  }


  onSubmit(): void {

    if (this.registerForm.value.password == this.registerForm.value.confirmPassword) {
      this.user.password = this.registerForm.value.password;
      this.user.isActivated = true;
      this.activateAccount();
      this.goToPage();
    }
    else {
      alert("hasla nie sa takie same")
    }


  }

  activateAccount(): void {
    this.activationService.putActivateAccount(this.user).subscribe({
      next: response => {
        alert("User zarejestrowany");        
      }
    })

  }

  goToPage(): void {
    this.router.navigate(['/commercial/main']);
    window.scrollTo({ top: 0, behavior: 'instant' });  
  }

}
