import { Directive, ElementRef, Input } from '@angular/core';

export type ThemePalette = 'primary' | 'accent' | 'warn' | 'contrast' | undefined;

@Directive({selector: 'abstarct-color'})
export class AmstoreColor {
    @Input()
    public set color(value: ThemePalette) {
        if (this._color !== value) {
            this.setColor(value);
        }

        this._color = value;
    }

    public get color(): ThemePalette {
        return this._color;
    }

    private _color: ThemePalette;
    protected defaultColor: ThemePalette = 'primary';

    constructor(public elementRef: ElementRef) {
        this.color = this.defaultColor;
    }

    private setColor(color: ThemePalette): void {
        this.elementRef.nativeElement.classList.remove(`amstore-${this._color}`);
        this.elementRef.nativeElement.classList.add(`amstore-${color}`);
    }
}
