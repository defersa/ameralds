import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'amstore-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-slide',
        '[class.amstore-slide-small]': 'size === "small"',
        '[class.amstore-slide-medium]': 'size === "medium"',
        '[class.amstore-slide-large]': 'size === "large"'
    }
})
export class AmstoreSlideComponent implements OnInit {

    @Input()
    public size: 'small' | 'medium' | 'large' = 'medium';

    @Input()
    public formControl: UntypedFormControl = new UntypedFormControl();

    constructor() { }

    ngOnInit(): void {
    }

}
