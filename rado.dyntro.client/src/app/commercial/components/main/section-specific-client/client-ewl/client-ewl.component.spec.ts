import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEwlComponent } from './client-ewl.component';

describe('ClientEwlComponent', () => {
  let component: ClientEwlComponent;
  let fixture: ComponentFixture<ClientEwlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientEwlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEwlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
