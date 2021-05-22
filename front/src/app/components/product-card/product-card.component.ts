import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModelSmall } from 'src/app/interface/image.interface';

@Component({
    selector: 'amstore-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input()
    public images: ImageModelSmall[] = [];

    @Input()
    public title: string = '';

    @Output()
    public clickTitle: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

    public onClickTitle(): void {
        this.clickTitle.emit();
    }
}
