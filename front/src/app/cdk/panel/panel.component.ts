import { Component, ElementRef, Input } from '@angular/core';
import { AmstoreColor } from "@am/cdk/core/color";
import { expandAnimation } from "@am/cdk/animations/expand";

@Component({
    selector: 'amstore-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    animations: [
        expandAnimation
    ],
    host: {
        class: 'amstore-panel'
    }
})
export class AmstorePanelComponent extends AmstoreColor {
    @Input()
    public state: boolean = false;

    public get expandState(): 'collapsed' | 'expanded' {
        return this.state ? 'expanded' : 'collapsed';
    }

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

}


@Component({
    selector: 'amstore-panel-header',
    template: '<ng-content></ng-content>'
})
export class AmstorePanelHeaderComponent {

}
