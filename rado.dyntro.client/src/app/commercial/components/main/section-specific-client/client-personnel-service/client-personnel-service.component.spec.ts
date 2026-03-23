import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPersonnelServiceComponent } from './client-personnel-service.component';

describe('ClientPersonnelServiceComponent', () => {
  let component: ClientPersonnelServiceComponent;
  let fixture: ComponentFixture<ClientPersonnelServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPersonnelServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPersonnelServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
