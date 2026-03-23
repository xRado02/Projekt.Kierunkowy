import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-clients',
  standalone: false,
  
  templateUrl: './section-clients.component.html',
  styleUrl: './section-clients.component.css'
})
export class SectionClientsComponent {

  constructor(private router: Router) { }

  goToPersonnelService() {
    this.router.navigate(['/commercial/client-personnel-service']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  goToPragmaGo() {
    this.router.navigate(['/commercial/client-pragma-go']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  goToArgentumEvent() {
    this.router.navigate(['/commercial/client-argentum-event']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  goToVendorise() {
    this.router.navigate(['/commercial/client-vendorise']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  goToMojoHr() {
    this.router.navigate(['/commercial/client-mojo-hr']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  goToEwl() {
    this.router.navigate(['/commercial/client-ewl']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  goToInnBenefits() {
    this.router.navigate(['/commercial/client-inn-benefits']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  



}
