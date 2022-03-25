import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ImageModel, ImageModelSmall } from '@am/interface/image.interface';
import { PatternMaxType } from '@am/interface/pattern.interface';
import { PatternService } from '@am/shared/services/pattern.service';
import { ImageToSmall } from '../../../utils/images';

@Component({
    selector: 'amstore-pattern-add',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss']
})
export class PatternAddComponent implements OnInit {

    public id: number;

    public images: ImageModelSmall[] = [];

    public asyncPattern: Observable<PatternMaxType>;

    constructor(
        private route: ActivatedRoute,
        private patternService: PatternService
    ) {

        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.asyncPattern = !this.id ? of(EMPTY_PATTERN) :
            this.patternService.getPatternEdit(this.id);
    }

    public ngOnInit(): void {
    }


    public goToCard(): void {
        this.patternService.goToCard(this.id);
    }

}

const EMPTY_PATTERN: PatternMaxType = {
    id: 0,
    name: { ru: '', en: '' },
    price: { ru: 0, en: 0 },
    description: '',
    sizes: [],
    create_date: '',
    hidden: false,
    images: [],
    category: []
}
