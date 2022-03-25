import { Directive, ElementRef, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { AmstoreColor } from '@am/cdk/core/color';

@Directive({
    selector: '[appSnapshotBase]'
})
export class AmstoreSnapshotBaseDirective extends AmstoreColor {
    @HostBinding('class')
    public classes: string = 'amstore-snapshot';


    @Input()
    public get isDark(): boolean {
        return this._isDark;
    }
    public set isDark(value: boolean) {
        this._isDark = value;
        this.setDarkClass();
    }

    private _isDark: boolean = false;


    @Output()
    public clickOnHeader: EventEmitter<void> = new EventEmitter<void>();

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

    private setDarkClass(): void {
        this._isDark ?
            this.elementRef.nativeElement.classList.add(`amstore-snapshot-dark`) :
            this.elementRef.nativeElement.classList.remove(`amstore-snapshot-dark`);
    }

    public clickOnHeaderAction() {
        this.clickOnHeader.emit();
    }
}
