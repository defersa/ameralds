import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { CoreModule } from 'src/app/core/core.module';
import { GoodsModule } from '../goods/goods.module';
import { GoodsService } from 'src/app/services/goods.service';



@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [
        CommonModule,
        CoreModule,
        GoodsModule
    ]
})
export class ProfileModule { }
