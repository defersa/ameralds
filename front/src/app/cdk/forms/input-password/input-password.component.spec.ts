import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstoreInputPasswordComponent } from './input-password.component';

describe('InputComponent', () => {
  let component: AmstoreInputPasswordComponent;
  let fixture: ComponentFixture<AmstoreInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstoreInputPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstoreInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
