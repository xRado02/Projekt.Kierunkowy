import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVendoriseComponent } from './client-vendorise.component';

describe('ClientVendoriseComponent', () => {
  let component: ClientVendoriseComponent;
  let fixture: ComponentFixture<ClientVendoriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientVendoriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVendoriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
