import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PatternService } from '@am/shared/services/pattern.service';

import { GoodsCard, GoodsModifire, ProductType } from '@am/interface/goods.intreface';
import { PatternMaxType } from '@am/interface/pattern.interface';
import { GoodsService } from '@am/services/goods.service';
import { ProfileService } from '@am/services/profile.service';
import { SIZE_UNIT } from "@am/utils/constants";

type PatterButtonStatus = {
    label: string;
    action: () => void;
    class: string;
}

@Component({
    selector: 'amstore-pattern-page',
    templateUrl: './pattern-card.component.html',
    styleUrls: ['./pattern-card.component.scss']
})
export class PatternCardComponent implements OnInit, OnDestroy {

    public pattern: PatternMaxType | undefined;

    public id: number;

    public button: PatterButtonStatus = {
        label: '',
        action: () => { },
        class: ''
    }

    public get moderStatus$(): BehaviorSubject<boolean> {
        return this.profileService.moderStatus$;
    }

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private patternService: PatternService,
        private profileService: ProfileService,
        private goodsService: GoodsService
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

    // public initSub(): void {
    //     this.patternService.getPattern(this.id)
    //         .subscribe((result: PatternMaxType) => {
    //             this.pattern = result;
    //             this.getPatternStatusUpdate()();
    //         });
    //     this.goodsService.goods$.pipe(takeUntil(this.destroyed))
    //         .subscribe(this.getPatternStatusUpdate());
    //     this.profileService.boughtPatterns$.pipe(takeUntil(this.destroyed))
    //         .subscribe(this.getPatternStatusUpdate());
    //
    //     this.profileService.moderStatus$.pipe(takeUntil(this.destroyed)).subscribe((status: boolean) => this.canEdit = status);
    // }
    //
    // public getPatternStatusUpdate(): () => void {
    //     return () => {
    //         this.button = {
    //             label: 'Купить',
    //             action: this.getAddToCard(),
    //             class: 'amstore-pattern-button_common'
    //         }
    //
    //         const goods: GoodsCard = this.goodsService.goods$.value;
    //         const bought: number[] = this.profileService.boughtPatterns$.value;
    //         if (goods.patterns.find((value: PatternMaxType) => value.id === this.id)) {
    //             this.button = {
    //                 label: 'Удалить из корзины',
    //                 action: this.getRemoveToCard(),
    //                 class: 'amstore-pattern-button_in-goods'
    //             }
    //         }
    //         if (bought.find((value: number) => value === this.id)) {
    //             this.button = {
    //                 label: 'Товар уже куплен',
    //                 action: () => { },
    //                 class: 'amstore-pattern-button_bought'
    //             }
    //         }
    //     };
    // }

    public getBack(): void {
        this.patternService.getBack();
    }

    // public getAddToCard(): () => void {
    //     return () => {
    //         this.goodsService.addProduct(
    //             ProductType.Patterns, this.pattern ? this.pattern : { id: 0, price: { en: 0, ru: 0 } })
    //             .subscribe((result: GoodsModifire) => {
    //             });
    //     }
    // }
    // public getRemoveToCard(): () => void {
    //     return () => {
    //         this.goodsService.removeProduct(
    //             ProductType.Patterns, this.id)
    //             .subscribe((result: GoodsModifire) => {
    //             });
    //     }
    // }

    public goToEdit(): void {
        this.patternService.goToEdit(this.id);
    }


}
