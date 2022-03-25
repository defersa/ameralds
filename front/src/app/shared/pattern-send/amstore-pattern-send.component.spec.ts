import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstorePatternSendComponent } from './amstore-pattern-send.component';

describe('PatternSendComponent', () => {
  let component: AmstorePatternSendComponent;
  let fixture: ComponentFixture<AmstorePatternSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmstorePatternSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmstorePatternSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
