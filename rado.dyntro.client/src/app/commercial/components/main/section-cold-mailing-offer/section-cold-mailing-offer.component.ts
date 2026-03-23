import { Component } from '@angular/core'; 
import { Router } from '@angular/router'

@Component({
  selector: 'app-section-cold-mailing-offer',
  standalone: false,
  
  templateUrl: './section-cold-mailing-offer.component.html',
  styleUrl: './section-cold-mailing-offer.component.css'
})
export class SectionColdMailingOfferComponent {


  constructor(private router: Router) { }

  goToContact() {
    this.router.navigate(['/commercial/contact']);
  }
}


