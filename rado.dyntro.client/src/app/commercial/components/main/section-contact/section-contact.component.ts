import { Component } from '@angular/core';

@Component({
  selector: 'app-section-contact',
  standalone: false,

  templateUrl: './section-contact.component.html',
  styleUrl: './section-contact.component.css'
})
export class SectionContactComponent {


  // Dodana klasa na szybkości ael to do zmiany. Walidacja ma być po stronie backendu a tu tylko wizualka.

  constructor() { }

  validForm() {
  const forms = document.querySelectorAll('form');

  forms.forEach((element) => {
    element.addEventListener('submit', (e) => {
      e.preventDefault();
      element.classList.add('was-validated');    
    });
  });
}


}
