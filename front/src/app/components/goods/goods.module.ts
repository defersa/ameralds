import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsLiteComponent } from './goods-lite.component';
import { GoodsService } from 'src/app/services/goods.service';


@NgModule({
    declarations: [GoodsLiteComponent],
    imports: [
        CommonModule
    ],
    exports: [GoodsLiteComponent],
    providers: [
        GoodsService
    ]
})
export class GoodsModule { }
