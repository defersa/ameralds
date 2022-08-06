import { CustomValidatorFns } from '@am/cdk/forms/custom-validators-fn';
import { SizeType } from '@am/interface/size.interface';
import { SizesService } from '@am/shared/services/sizes.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'asmtore-size-edit',
    templateUrl: './size-edit.component.html',
    styleUrls: ['./size-edit.component.scss']
})
export class SizeEditComponent implements OnInit {

    public id: number | undefined;
    public isEdit: boolean;

    public form: UntypedFormGroup | undefined;

    public get controlValue(): UntypedFormControl {
        return this.form?.controls['value'] as UntypedFormControl;
    }

    public get initedForm(): UntypedFormGroup {
        return this.form || new UntypedFormGroup({});
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
            this.form = new UntypedFormGroup({
                id: new UntypedFormControl(),
                create_date: new UntypedFormControl(),
                value: new UntypedFormControl(null, [Validators.required, CustomValidatorFns.getNotUniqValue(result.items.map((item: SizeType) => String(item.value) ))])
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
