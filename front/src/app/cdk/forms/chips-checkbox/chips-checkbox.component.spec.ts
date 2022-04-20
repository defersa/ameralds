import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsCheckboxComponent } from './chips-checkbox.component';

describe('ChipsCheckboxComponent', () => {
  let component: ChipsCheckboxComponent;
  let fixture: ComponentFixture<ChipsCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
