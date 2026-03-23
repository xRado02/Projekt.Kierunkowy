import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMojoHrComponent } from './client-mojo-hr.component';

describe('ClientMojoHrComponent', () => {
  let component: ClientMojoHrComponent;
  let fixture: ComponentFixture<ClientMojoHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientMojoHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMojoHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
