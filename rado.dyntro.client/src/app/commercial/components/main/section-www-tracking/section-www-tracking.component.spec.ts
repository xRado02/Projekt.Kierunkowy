import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWwwTrackingComponent } from './section-www-tracking.component';

describe('SectionWwwTrackingComponent', () => {
  let component: SectionWwwTrackingComponent;
  let fixture: ComponentFixture<SectionWwwTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionWwwTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWwwTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
