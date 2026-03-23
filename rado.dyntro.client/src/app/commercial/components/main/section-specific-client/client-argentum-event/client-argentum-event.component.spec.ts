import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientArgentumEventComponent } from './client-argentum-event.component';

describe('ClientArgentumEventComponent', () => {
  let component: ClientArgentumEventComponent;
  let fixture: ComponentFixture<ClientArgentumEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientArgentumEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientArgentumEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
