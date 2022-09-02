import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstoreRegistrationComponent } from './amstore-registration.component';

describe('RegistrationComponent', () => {
  let component: AmstoreRegistrationComponent;
  let fixture: ComponentFixture<AmstoreRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstoreRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstoreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
