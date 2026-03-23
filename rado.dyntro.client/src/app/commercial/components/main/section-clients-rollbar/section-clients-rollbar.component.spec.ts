import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClientsRollbarComponent } from './section-clients-rollbar.component';

describe('SectionClientsRollbarComponent', () => {
  let component: SectionClientsRollbarComponent;
  let fixture: ComponentFixture<SectionClientsRollbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionClientsRollbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClientsRollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
