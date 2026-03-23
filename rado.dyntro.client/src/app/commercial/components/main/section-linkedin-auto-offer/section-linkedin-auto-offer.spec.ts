import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLinkedinAutomatizationOfferComponent } from './section-linkedin-auto-offer.component';

describe('SectionLinkedinAutomatizationOfferComponent', () => {
  let component: SectionLinkedinAutomatizationOfferComponent;
  let fixture: ComponentFixture<SectionLinkedinAutomatizationOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionLinkedinAutomatizationOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionLinkedinAutomatizationOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
