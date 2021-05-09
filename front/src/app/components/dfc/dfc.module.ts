import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponentComponent } from './common/wrapper-component/wrapper-component.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DfcElementDirective } from './common/dfc-element/dfc-element.component';



@NgModule({
    declarations: [WrapperComponentComponent, InputComponent, DfcElementDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        InputComponent
    ]
})
export class DfcModule { }
