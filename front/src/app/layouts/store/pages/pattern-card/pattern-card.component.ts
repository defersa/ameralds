import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { GoodsCard, GoodsModifire, ProductLite, ProductType } from 'src/app/interface/goods.intreface';
import { PatternRequest, SmallPattern } from 'src/app/interface/pattern.interface';
import { GoodsService } from 'src/app/services/goods.service';
import { ProfileService } from 'src/app/services/profile.service';
import { PatternService } from '../../services/pattern.service';

type PatterButtonStatus = {
    label: string;
    action: () => void;
    class: string;
}

@Component({
    selector: 'amstore-pattern-card',
    templateUrl: './pattern-card.component.html',
    styleUrls: ['./pattern-card.component.scss']
})
export class PatternCardComponent implements OnInit, OnDestroy {


    public pattern: SmallPattern | undefined;

    public id: number;

    public button: PatterButtonStatus = {
        label: '',
        action: () => { },
        class: ''
    }
    public canEdit: boolean = false;

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
        this.initSub();
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public initSub(): void {
        this.patternService.getPattern(this.id)
            .pipe(map((request: PatternRequest) => request.pattern))
            .subscribe((result) => {
                this.pattern = result;
                this.getPatternStatusUpdate()();
            });
        this.goodsService.goods$.pipe(takeUntil(this.destroyed))
            .subscribe(this.getPatternStatusUpdate());
        this.profileService.boughtPatterns$.pipe(takeUntil(this.destroyed))
            .subscribe(this.getPatternStatusUpdate());

        this.profileService.godmodeStatus$.pipe(takeUntil(this.destroyed)).subscribe((status: boolean) => this.canEdit = status);
    }

    public getPatternStatusUpdate(): () => void {
        return () => {
            this.button = {
                label: 'Купить',
                action: this.getAddToCard(),
                class: 'amstore-pattern-button_common'
            }

            const goods: GoodsCard = this.goodsService.goods$.value;
            const bought: number[] = this.profileService.boughtPatterns$.value;
            if (goods.patterns.find((value: SmallPattern) => value.id === this.id)) {
                this.button = {
                    label: 'Удалить из корзины',
                    action: this.getRemoveToCard(),
                    class: 'amstore-pattern-button_in-goods'
                }
            }
            if (bought.find((value: number) => value === this.id)) {
                this.button = {
                    label: 'Товар уже куплен',
                    action: () => { },
                    class: 'amstore-pattern-button_bought'
                }
            }
        };
    }

    public getBack(): void {
        this.patternService.getBack();
    }

    public getAddToCard(): () => void {
        return () => {
            this.goodsService.addProduct(
                ProductType.Patterns, this.pattern ? this.pattern : { id: 0, price_en: 0, price_ru: 0 })
                .subscribe((result: GoodsModifire) => {
                });
        }
    }
    public getRemoveToCard(): () => void {
        return () => {
            this.goodsService.removeProduct(
                ProductType.Patterns, this.id)
                .subscribe((result: GoodsModifire) => {
                });
        }
    }

    public goToEdit(): void {
        this.patternService.goToEdit(this.id);
    }


}
