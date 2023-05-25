import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PatternService } from '@am/services/pattern.service';
import { PatternMaxType } from '@am/interface/pattern.interface';
import { DestroySubject } from "@am/utils/destroy.service";
import { Location } from "@angular/common";


type PatterButtonStatus = {
    label: string;
    action: () => void;
    class: string;
}

@Component({
    selector: 'amstore-pattern-page',
    templateUrl: './pattern-card.component.html',
    styleUrls: ['./pattern-card.component.scss'],
    providers: [DestroySubject],
})
export class PatternCardComponent implements OnInit {
    protected readonly location: Location = inject(Location);
    public pattern: PatternMaxType | undefined;
    public id: number;

    public button: PatterButtonStatus = {
        label: '',
        action: () => { },
        class: ''
    }

    constructor(

        private route: ActivatedRoute,
        private patternService: PatternService,
    ) {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        this.patternService.getPattern(this.id)
            .subscribe((result: PatternMaxType) => this.pattern = result );
    }

    public getBack(): void {
        this.location.back();
    }
}
