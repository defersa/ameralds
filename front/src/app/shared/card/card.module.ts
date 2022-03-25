import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreCardDirective } from './card.directive';
import { AmstorePatternCardComponent } from './pattern/pattern.component';
import { AmstoreButtonDefaultModule } from '@am/cdk/buttons/default/default.module';
import { AmstoreIconModule } from '@am/cdk/icons/icons.module';
import { AmstoreChipModule } from '@am/cdk/chip/chip.module';
import { AmstoreSlideModule } from '@am/cdk/slide/slide.module';
import { AmstoreInfoModule } from '@am/cdk/info/info.module';
import { AmstoreFormsModule } from '@am/cdk/forms/forms.module';
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
