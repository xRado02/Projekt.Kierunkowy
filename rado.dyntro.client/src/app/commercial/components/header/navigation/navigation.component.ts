import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { 
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        this.closeNavbarMenu(); 
      });
  }

  private closeNavbarMenu(): void {
    const navbarMenu = document.getElementById('menu');
    if (navbarMenu) {
      navbarMenu.classList.remove('show'); 
    }
  }









}
