import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { PatternService } from '@am/shared/services/pattern.service';
import { PatternMaxType } from '@am/interface/pattern.interface';
import { ProfileService } from '@am/services/profile.service';
import { map } from "rxjs/operators";
import { UserEnum } from "@am/utils/router-builder";
import { Location } from "@angular/common";


@Component({
    selector: 'amstore-pattern-page',
    templateUrl: './pattern-card.component.html',
    styleUrls: ['./pattern-card.component.scss']
})
export class PatternCardComponent implements OnInit, OnDestroy {

    public pattern: PatternMaxType | undefined;

    public id: number;

    protected destroyed: Subject<void> = new Subject<void>();

    protected readonly location: Location = inject(Location);

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

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public getBack(): void {
        this.location.back();
    }
}
