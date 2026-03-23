import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMajorComponent } from './section-major.component';

describe('SectionMajorComponent', () => {
  let component: SectionMajorComponent;
  let fixture: ComponentFixture<SectionMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionMajorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
