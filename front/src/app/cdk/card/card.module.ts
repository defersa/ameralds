import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreCardDirective } from './card.directive';
import { AmstorePatternCardComponent } from './pattern/pattern.component';
import { AmstoreButtonDefaultModule } from '../buttons/default/default.module';
import { AmstoreIconModule } from '../icons/icons.module';
import { AmstoreChipModule } from '../chip/chip.module';
import { AmstoreSlideModule } from '../slide/slide.module';
import { AmstoreInfoModule } from '../info/info.module';
import { AmstoreFormsModule } from '../forms/forms.module';
import { AmstorePatternAddCardComponent } from './pattern-add/pattern-add.component';


@NgModule({
    declarations: [AmstoreCardDirective, AmstorePatternCardComponent, AmstorePatternAddCardComponent],
    imports: [
        CommonModule,
        AmstoreButtonDefaultModule,
        AmstoreIconModule,
        AmstoreChipModule,
        AmstoreSlideModule,
        AmstoreInfoModule,
        AmstoreFormsModule
    ],
    exports: [AmstorePatternCardComponent, AmstorePatternAddCardComponent]
})
export class AmstoreCardModule { }
