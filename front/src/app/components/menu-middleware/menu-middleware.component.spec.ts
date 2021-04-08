import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMiddlewareComponent } from './menu-middleware.component';

describe('MenuMiddlewareComponent', () => {
  let component: MenuMiddlewareComponent;
  let fixture: ComponentFixture<MenuMiddlewareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMiddlewareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMiddlewareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
