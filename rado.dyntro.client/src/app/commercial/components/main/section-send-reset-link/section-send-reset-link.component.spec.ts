import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSendResetLinkComponent } from './section-send-reset-link.component';

describe('SectionSendResetLinkComponent', () => {
  let component: SectionSendResetLinkComponent;
  let fixture: ComponentFixture<SectionSendResetLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionSendResetLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSendResetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
