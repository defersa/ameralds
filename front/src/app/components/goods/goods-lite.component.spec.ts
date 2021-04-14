import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsLiteComponent } from './goods-lite.component';

describe('GoodsComponent', () => {
    let component: GoodsLiteComponent;
    let fixture: ComponentFixture<GoodsLiteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GoodsLiteComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GoodsLiteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
