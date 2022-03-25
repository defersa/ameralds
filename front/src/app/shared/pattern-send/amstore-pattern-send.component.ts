import { Component, Input, OnInit } from '@angular/core';

import { PattenSizeFiles, PatternMaxType } from "@am/interface/pattern.interface";
import { LangService } from "@am/services/lang.service";
import { FormControl, Validators } from "@angular/forms";
import { PatternService } from "@am/shared/services/pattern.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SelectOption } from "@am/cdk/forms/forms.abstract.directive";

@Component({
    selector: 'amstore-pattern-send',
    templateUrl: './amstore-pattern-send.component.html',
    styleUrls: ['./amstore-pattern-send.component.scss']
})
export class AmstorePatternSendComponent implements OnInit {
    @Input()
    public set pattern(value: PatternMaxType | undefined) {
        if(value) {
            this.sizes = value.sizes.map((item: PattenSizeFiles) => ({
                value: item.size.value,
                control: new FormControl()
            }));
        }

        this._pattern = value;
    };

    public get pattern(): PatternMaxType | undefined {
        return this._pattern;
    };

    private _pattern: PatternMaxType | undefined = undefined;

    public langDict: SelectOption[] = [
        { label: 'Пусто', value: null},
        { label: 'RU', value: 'ru'},
        { label: 'EN', value: 'en'},
    ]
    public langControl: FormControl = new FormControl(null, [Validators.required])
    public emailControl: FormControl = new FormControl('', [Validators.email])
    public sizes: { value: number; control: FormControl; }[] = [];

    constructor(private _lang: LangService,
                private _patternService: PatternService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    public send(): void {
        const hasSize: boolean = this.sizes
            .map((item: { value: number; control: FormControl; }) => item.control.value)
            .reduce((acc: boolean, item: boolean) => acc || item, false);

        if(this.langControl.invalid || !hasSize || !this._pattern || this.emailControl.invalid) {
            this._snackBar.open('Не все поля заполнены корректно', undefined, { duration: 5000 });
            return;
        }

        const sizes: number[] = this.sizes
            .filter((item: { value: number; control: FormControl; }) => item.control.value)
            .map((item: { value: number; control: FormControl; }) => item.value);

        this._patternService.sendPatternMail(this.emailControl.value, this.langControl.value, this._pattern.id , sizes).subscribe(() => {
            this._snackBar.open('Е, отправил.', undefined, { duration: 5000 });
        });
    }
}
