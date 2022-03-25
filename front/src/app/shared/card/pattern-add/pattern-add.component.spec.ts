import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstorePatternAddCardComponent } from './pattern-add.component';

describe('PatternComponent', () => {
  let component: AmstorePatternAddCardComponent;
  let fixture: ComponentFixture<AmstorePatternAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstorePatternAddCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstorePatternAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
