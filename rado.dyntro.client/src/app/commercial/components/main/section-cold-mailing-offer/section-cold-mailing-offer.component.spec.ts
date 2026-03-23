import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionColdMailingOfferComponent } from './section-cold-mailing-offer.component';

describe('SectionColdMailingOfferComponent', () => {
  let component: SectionColdMailingOfferComponent;
  let fixture: ComponentFixture<SectionColdMailingOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionColdMailingOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionColdMailingOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
