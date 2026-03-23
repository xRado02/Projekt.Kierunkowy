import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-welcome',
  standalone: false,
  templateUrl: './section-welcome.component.html',
  styleUrls: ['./section-welcome.component.css'] 
})
export class SectionWelcomeComponent {

  constructor(private router: Router) { } 

  goToContact() {
    this.router.navigate(['/commercial/contact']); 
  }
}
