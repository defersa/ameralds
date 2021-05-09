import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomValidatorFns } from 'src/app/components/dfc/common/custom-validators-fn';
import { getAction, HttpActions } from 'src/app/utils/action-builder';
import { PatternRequest, PatternService, PatternType } from '../../services/pattern.service';

const EDIT_FIELDS: string[] = ['name', 'price_en', 'price_ru'];

@Component({
    selector: 'amstore-pattern-add',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss']
})
export class PatternAddComponent implements OnInit {

    public id: number;
    public patternForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private patternService: PatternService,
        private httpService: HttpClient
    ) {
        this.patternForm = new FormGroup({
            name: new FormControl('', Validators.required),
            price_en: new FormControl('', [Validators.required, CustomValidatorFns.getMinValue(0)]),
            price_ru: new FormControl('', [Validators.required, CustomValidatorFns.getMinValue(0)])
        });

        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.patternService.getPattern(this.id)
                .pipe(map((request: PatternRequest) => request.pattern))
                .subscribe((pattern: PatternType) => {
                    EDIT_FIELDS.forEach((key: string) => {
                        console.log(pattern[key as keyof PatternType], pattern);
                        this.getControl(key).setValue(pattern[key as keyof PatternType]);
                    });
                })
        }
    }

    public ngOnInit(): void {
    }

    public getControl(name: string): FormControl {
        return this.patternForm.get(name) as FormControl || new FormControl;
    }

    public file: File | null = null;

    public upload(): void {
        console.log(this.file);
        if (!this.file) {
            return;
        }
        const data: FormData = new FormData();
        data.append('file', this.file);
        data.append('title', 'file');
        this.httpService.post(getAction(HttpActions.UploadImage), data).subscribe((result) => {
            console.log(result);
        })
    }
    public dropFiles(fileList: EventTarget | null): void {
        const files: FileList | null = fileList ? (fileList as HTMLInputElement).files : null;
        this.file = files?.length ? files[0] : null;
    }
    public savePattern(): void {
        if(this.patternForm.invalid){
            return;
        }
        if(!this.id) {
            this.patternService.createPattern(this.patternForm.value).subscribe((result) => console.log(result));
        }
        console.log(this.patternForm.value, this.patternForm.valid);
    }
}
