import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ImageModelSmall } from '@am/interface/image.interface';
import { PatternMaxType } from '@am/interface/pattern.interface';
import { PatternService } from '@am/shared/services/pattern.service';
import { EMPTY_PATTERN } from "@am/shared/mocks/pattern";

@Component({
    selector: 'amstore-pattern-add',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss']
})
export class PatternAddComponent {

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

    public goToCard(): void {
        this.patternService.goToCard(this.id);
    }

}
