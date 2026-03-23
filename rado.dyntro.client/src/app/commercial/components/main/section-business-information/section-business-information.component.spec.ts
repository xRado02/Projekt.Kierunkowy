import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBusinessInformationComponent } from './section-business-information.component';

describe('SectionBusinessInformationComponent', () => {
  let component: SectionBusinessInformationComponent;
  let fixture: ComponentFixture<SectionBusinessInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionBusinessInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBusinessInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
