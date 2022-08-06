import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstoreAuthComponent } from './amstore-auth.component';

describe('AuthComponent', () => {
  let component: AmstoreAuthComponent;
  let fixture: ComponentFixture<AmstoreAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstoreAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstoreAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
