import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-business-information',
  standalone: false,
  templateUrl: './section-business-information.component.html',
  styleUrls: ['./section-business-information.component.css']
})
export class SectionBusinessInformationComponent {

  constructor(private router: Router) { }

  goToColdMailing() {
    this.router.navigate(['/commercial/cold-mailing']);
    window.scrollTo({ top: 0, behavior: 'instant' }); 
  }

  goToLinkedinAutomatization() {
    this.router.navigate(['/commercial/linkedin-auto']);
    window.scrollTo({ top: 0, behavior: 'instant' });  
  }


  goToContact() {
    this.router.navigate(['/commercial/contact']);
  }






}
