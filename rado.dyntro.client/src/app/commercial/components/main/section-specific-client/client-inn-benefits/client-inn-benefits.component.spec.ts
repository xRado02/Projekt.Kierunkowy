import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInnBenefitsComponent } from './client-inn-benefits.component';

describe('ClientInnBenefitsComponent', () => {
  let component: ClientInnBenefitsComponent;
  let fixture: ComponentFixture<ClientInnBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientInnBenefitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInnBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
