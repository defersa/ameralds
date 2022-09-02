import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstoreVerifyComponent } from './amstore-verify.component';

describe('RegistrationComponent', () => {
  let component: AmstoreVerifyComponent;
  let fixture: ComponentFixture<AmstoreVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstoreVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstoreVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
