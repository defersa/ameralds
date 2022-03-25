import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedPageComponent } from './paginated-page.component';

describe('PaginatedPageComponent', () => {
  let component: PaginatedPageComponent;
  let fixture: ComponentFixture<PaginatedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
