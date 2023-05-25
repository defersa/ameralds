import { Component, Input, OnInit } from '@angular/core';
import { IPattern, PattenSizeFiles, PatternMaxType } from "@am/interface/pattern.interface";
import { FormControl, FormGroup } from "@angular/forms";
import { SelectOption } from "@am/cdk/forms/forms.abstract.directive";
import { IdName } from "@am/interface/request.interface";

@Component({
    selector: 'admin-pattern-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    @Input()
    public set pattern(value: PatternMaxType) {
        this._pattern = value;

        this.sizeItems = this._pattern.sizes.map((item: PattenSizeFiles) => ({
            label: String(item.size.value),
            value: item.id,
        }));
    }

    public get pattern(): PatternMaxType {
        return this._pattern;
    }

    private _pattern: PatternMaxType;

    public form: FormGroup = new FormGroup({
        color: new FormControl(),
        size: new FormControl([]),
    });

    public sizeItems: SelectOption[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
