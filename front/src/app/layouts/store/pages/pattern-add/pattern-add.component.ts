import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomValidatorFns } from 'src/app/components/dfc/common/custom-validators-fn';
import { ImageModel, ImageModelSmall } from 'src/app/interface/image.interface';
import { PatternRequest, PatternType } from 'src/app/interface/pattern.interface';
import { PatternService } from '../../services/pattern.service';
import { ImageToSmall } from '../../utils/images';

@Component({
    selector: 'amstore-pattern-add',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss']
})
export class PatternAddComponent implements OnInit {

    public id: number;
    public patternForm: FormGroup;

    public images: ImageModelSmall[] = [];

    public asyncPattern: Observable<PatternType>; 

    constructor(
        private route: ActivatedRoute,
        private patternService: PatternService
    ) {
        this.patternForm = new FormGroup({
            name: new FormControl('', Validators.required),
            price_en: new FormControl('', [Validators.required, CustomValidatorFns.getMinValue(0)]),
            price_ru: new FormControl('', [Validators.required, CustomValidatorFns.getMinValue(0)])
        });

        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.asyncPattern = !this.id ? of(EMPTY_PATTERN) :
            this.patternService.getPattern(this.id)
                .pipe(map((request: PatternRequest) => request.pattern));
    }

    public ngOnInit(): void {
    }

    public getControl(name: string): FormControl {
        return this.patternForm.get(name) as FormControl || new FormControl;
    }

    public savePattern(): void {
        if(this.patternForm.invalid){
            return;
        }
        const value: Record<string, unknown> = {
            ...this.patternForm.value,
            id: this.id,
            images: this.images.map((image: ImageModelSmall) => image.id)
        }

        if(!this.id) {
            this.patternService
                .createPattern(value)
                .subscribe((result) => this.patternService.goToCard(result.id));
            return;
        }
        this.patternService
            .updatePattern(value)
            .subscribe((result) => console.log(result));
    }
    public deletePattern(): void {
        this.patternService.removePattern(this.id).subscribe((result) => this.patternService.getBack());
    }

    public goToCard(): void {
        this.patternService.goToCard(this.id);
    }

    public changeImage(image: ImageModel): void {
        this.images.find((item: ImageModelSmall) => item.id === image.id) ? this.removeImage(image) : this.addImage(image);
    }


    public addImage(image: ImageModel): void {
        this.images = [ImageToSmall(image), ...this.images];
    }
    public removeImage(image: ImageModel | ImageModelSmall): void {
        this.images = this.images.filter((item: ImageModelSmall) => item.id !== image.id);
    }
}
const EMPTY_PATTERN: PatternType = {    
    id: 0,
    name: '',
    description: '',
    urls: '',
    price_ru: 0,
    price_en: 0,
    create_date: '',
    images: []
}