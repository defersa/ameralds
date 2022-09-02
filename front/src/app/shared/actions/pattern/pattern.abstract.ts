import { Directive, Injector, Input, OnDestroy } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";

import { LangType } from "@am/interface/lang.interface";
import { SIZE_UNIT } from "@am/utils/constants";
import { PattenSizeFiles, PatternMaxType } from "@am/interface/pattern.interface";
import { EMPTY_PATTERN } from "@am/shared/mocks/pattern";
import { Subject } from "rxjs";
import { LangService } from "@am/services/lang.service";
import { takeUntil } from "rxjs/operators";


@Directive({
    selector: 'abstract-pattern-card',
})
export class AbstractPatternCard implements OnDestroy {

    /** Lang getters */
    private _lang: LangType = 'ru';

    public get sizeUnit(): string {
        return SIZE_UNIT[this._lang];
    }

    public get title(): string {
        return this.data.name[this._lang];
    };

    public sizesWithControl: { value: number; control: UntypedFormControl; id: number; }[] = [];

    /** Pattern input */
    @Input()
    public set data(value: PatternMaxType) {
        this.sizesWithControl = value.sizes.map((item: PattenSizeFiles) => ({
            value: item.size.value,
            control: new UntypedFormControl(),
            id: item.id
        }));
        this._data = value;
    };
    public get data(): PatternMaxType {
        return this._data;
    };
    private _data: PatternMaxType = EMPTY_PATTERN;

    /** Subjects */
    protected destroyed: Subject<void> = new Subject<void>();

    /** Providers */
    private _langService: LangService;

    constructor(injector: Injector) {
        this._langService = injector.get(LangService);

        this._langService.lang$
            .pipe(takeUntil(this.destroyed))
            .subscribe((lang: 'en' | 'ru') => this._lang = lang);
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

}
