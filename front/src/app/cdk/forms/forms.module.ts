import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { AmstoreInputComponent } from './input/input.component';
import { AmstoreFormLabel } from './forms.abstract.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmstoreCheckboxComponent } from './checkbox/checkbox.component';



@NgModule({
    declarations: [AmstoreInputComponent,
        AmstoreFormLabel,
        AmstoreCheckboxComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        AmstoreInputComponent,
        AmstoreFormLabel,
        AmstoreCheckboxComponent
    ]
})
export class AmstoreFormsModule { }
