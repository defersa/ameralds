import { Component, Input, OnInit } from '@angular/core';
import { DfcElementDirective } from '../../common/dfc-element/dfc-element.component';

type InputType = 'text' | 'number' | null;

@Component({
    selector: 'dfc-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent extends DfcElementDirective implements OnInit {
    
    @Input()
    public type: InputType = null;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}
