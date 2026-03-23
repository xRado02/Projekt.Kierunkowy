import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPragmaGoComponent } from './client-pragma-go.component';

describe('ClientPragmaGoComponent', () => {
  let component: ClientPragmaGoComponent;
  let fixture: ComponentFixture<ClientPragmaGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPragmaGoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPragmaGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
