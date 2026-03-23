import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../../core/services/auth-user.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  isAdmin: boolean = false;
  constructor(private authService: AuthUserService, private router: Router) { }

  ngOnInit(): void {
    const currentRole = this.authService.getUserRole();
    this.isAdmin = currentRole == 'Admin';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
