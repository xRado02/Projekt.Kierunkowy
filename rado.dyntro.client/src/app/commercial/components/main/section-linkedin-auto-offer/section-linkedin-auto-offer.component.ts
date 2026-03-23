import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-linkedin-auto-offer',
  standalone: false,
  
  templateUrl: './section-linkedin-auto-offer.component.html',
  styleUrl: './section-linkedin-auto-offer.component.css'
})
export class SectionLinkedinAutoOfferComponent {

  constructor(private router: Router) { }

  goToContact() {
    this.router.navigate(['/commercial/contact']);
  }
}
