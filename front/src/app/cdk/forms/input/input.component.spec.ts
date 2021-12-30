import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstoreInputComponent } from './input.component';

describe('InputComponent', () => {
  let component: AmstoreInputComponent;
  let fixture: ComponentFixture<AmstoreInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstoreInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstoreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
