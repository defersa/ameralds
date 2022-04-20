import { CustomValidatorFns } from '@am/cdk/forms/custom-validators-fn';
import { SizeType } from '@am/interface/size.interface';
import { SizesService } from '@am/shared/services/sizes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'asmtore-size-edit',
    templateUrl: './size-edit.component.html',
    styleUrls: ['./size-edit.component.scss']
})
export class SizeEditComponent implements OnInit {

    public id: number | undefined;
    public isEdit: boolean;

    public form: FormGroup | undefined;

    public get controlValue(): FormControl {
        return this.form?.controls['value'] as FormControl;
    }

    public get initedForm(): FormGroup {
        return this.form || new FormGroup({});
    }

    constructor(
        private route: ActivatedRoute,
        private sizes: SizesService

    ) {
        this.isEdit = this.route.snapshot.paramMap.get('id') !== null;
        if (this.isEdit) {
            this.id = Number(this.route.snapshot.paramMap.get('id'));
        }
    }

    public ngOnInit(): void {
        this.sizes.getAllSizes().subscribe((result: {items: SizeType[]})=> {
            this.form = new FormGroup({
                id: new FormControl(),
                create_date: new FormControl(),
                value: new FormControl(null, [Validators.required, CustomValidatorFns.getNotUniqValue(result.items.map((item: SizeType) => String(item.value) ))])
            });
            if (this.isEdit && typeof this.id === 'number') {
                this.sizes.getSize(this.id)
                    .subscribe((result: SizeType) => {
                        this.initedForm.setValue(result);
                    });
            }
        });
    }

    public save(): void {
        this.isEdit ?
            this.sizes.editSize(this.initedForm.getRawValue()) :
            this.sizes.saveSize(this.initedForm.getRawValue());
    }

    public delete(): void {
        this.sizes.deleteSize(this.initedForm.getRawValue());
    }

    public getBack(): void {
        this.sizes.goToSizes();
    }

}
