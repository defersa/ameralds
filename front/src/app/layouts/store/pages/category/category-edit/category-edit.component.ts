import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from 'src/app/shared/services/categories.service';
import {CategoryType} from 'src/app/interface/category.interface';
import {pipe} from "rxjs";
import {map} from "rxjs/operators";
import {LangString} from "@am/interface/lang.interface";

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

    public id: number | undefined;
    public isEdit: boolean;

    public form: UntypedFormGroup = new UntypedFormGroup({
        id: new UntypedFormControl(),
        ru: new UntypedFormControl(),
        en: new UntypedFormControl()
    });

    public get controlNameRu(): UntypedFormControl {
        return this.form.controls['ru'] as UntypedFormControl;
    }

    public get controlNameEn(): UntypedFormControl {
        return this.form.controls['en'] as UntypedFormControl;
    }

    constructor(
        private route: ActivatedRoute,
        private categories: CategoriesService
    ) {
        this.isEdit = this.route.snapshot.paramMap.get('id') !== null;
        if (this.isEdit) {
            this.id = Number(this.route.snapshot.paramMap.get('id'));
        }
    }

    public ngOnInit(): void {
        if (this.isEdit && typeof this.id === 'number') {
            this.categories.getCategory(this.id)
                .pipe(map((result: CategoryType) => ({...result.name, id: result.id})))
                .subscribe((result: Record<string, string | number>) => {
                    this.form.setValue(result);
                });
        }
    }

    public save(): void {
        this.isEdit ?
            this.categories.editCategory(this.form.getRawValue()) :
            this.categories.saveCategory(this.form.getRawValue());
    }

    public delete(): void {
        this.categories.deleteCategory(Number(this.id));
    }

    public getBack(): void {
        this.categories.goToCategories();
    }
}
