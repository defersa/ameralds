import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AmstoreColor } from '@am/cdk/core/color';
import { IconsName, IconsService } from './icons.service';
import { SafeHtml } from '@angular/platform-browser';


export type IconSize = 12 | 16 | 20 | 24 | 32;

const SRC_MAP: Map<IconsName, string> = new Map([
    ['login', 'assets/icons/NI Login.svg']
]);

@Component({
    selector: 'amstore-icon',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'amstore-icon',
        '[class.is-contrast]': 'contrast',
        '[class.is-black]': 'isBlack'
    }
})
export class IconsComponent extends AmstoreColor implements OnDestroy {
    @Input()
    public iconName: IconsName = 'login';


    public svgReady: boolean = false;

    public get svgXml(): SafeHtml | undefined {
        return this._iconService.svgMap.get(this.iconName);
    }

    @Input()
    public size: IconSize = 16;

    @Input()
    public contrast: boolean = false;

    @Input()
    public isBlack: boolean = false;

    public get src(): string | undefined {
        return SRC_MAP.get(this.iconName);
    }

    constructor(public elementRef: ElementRef,
        private _iconService: IconsService,
        private _changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);

        this._iconService.httpReady$.subscribe((result: boolean) => {
            this.svgReady = result;
            this._changeDetectorRef.markForCheck();
        });
    }

    public ngOnDestroy(): void {

    }

}
