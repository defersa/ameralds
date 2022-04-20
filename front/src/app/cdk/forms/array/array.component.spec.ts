import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmstoreFormArrayComponent } from './array.component';

describe('CheckboxComponent', () => {
    let component: AmstoreFormArrayComponent;
    let fixture: ComponentFixture<AmstoreFormArrayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AmstoreFormArrayComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AmstoreFormArrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
