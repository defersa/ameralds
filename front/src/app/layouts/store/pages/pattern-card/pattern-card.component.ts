import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { GoodsCard, GoodsModifire, GoodsService, ProductLite, ProductType } from 'src/app/services/goods.service';
import { PatternService } from '../../services/pattern.service';
import { SmallPattern } from '../patterns/patterns.component';

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
export class PatternCardComponent implements OnInit {

    public pattern: SmallPattern | undefined;

    public id: number;

    public button: PatterButtonStatus = {
        label: '',
        action: () => { },
        class: ''
    }

    constructor(
        private route: ActivatedRoute,
        private patternService: PatternService,
        private authService: AuthService,
        private goodsService: GoodsService
    ) {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        this.patternService.getPattern(this.id)
            .subscribe((result) => {
                console.log(result);
                this.pattern = result;
            })
        this.goodsService.goods$.subscribe(this.getPatternStatusUpdate());
        this.authService.boughtPatterns$.subscribe(this.getPatternStatusUpdate());
        this.getPatternStatusUpdate()();
    }

    public getPatternStatusUpdate(): () => void {
        return () => {
            this.button = {
                label: 'Купить',
                action: this.getAddToCard(),
                class: 'amstore-pattern-button_common'
            }

            const goods: GoodsCard = this.goodsService.goods$.value;
            const bought: number[] = this.authService.boughtPatterns$.value;
            if (goods.patterns.find((value: ProductLite) => value.id === this.id)) {
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
                ProductType.Patterns, this.pattern ?
                {
                    id: this.id,
                    price_en: this.pattern.price_eu,
                    price_ru: this.pattern?.price_ru,

                } : { id: 0, price_en: 0, price_ru: 0 })
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

}
