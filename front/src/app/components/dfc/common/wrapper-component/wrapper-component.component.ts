import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfc-wrapper-component',
    templateUrl: './wrapper-component.component.html',
    styleUrls: ['./wrapper-component.component.scss']
})
export class WrapperComponentComponent implements OnInit {

    @Input()
    public error: string | null = null;

    @Input()
    public label: string | null = null;

    constructor() { }

    ngOnInit(): void {
    }

}
