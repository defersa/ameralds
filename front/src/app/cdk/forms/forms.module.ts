import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { AmstoreInputComponent } from './input/input.component';
import { AmstoreFormLabel } from './forms.abstract.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmstoreCheckboxComponent } from './checkbox/checkbox.component';
import { AmstoreSelectComponent } from './select/select.component';
import { AmstoreButtonDefaultModule } from '../buttons/default/default.module';
import { AmstoreFormArrayComponent } from './array/array.component';
import { AmstoreUploadFileComponent } from './upload-file/upload-file.component';
import { AmstoreIconModule } from '../icons/icons.module';



@NgModule({
    declarations: [
        AmstoreInputComponent,
        AmstoreFormLabel,
        AmstoreCheckboxComponent,
        AmstoreSelectComponent,
        AmstoreFormArrayComponent,
        AmstoreUploadFileComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        AmstoreButtonDefaultModule,
        AmstoreIconModule
    ],
    exports: [
        AmstoreInputComponent,
        AmstoreFormLabel,
        AmstoreCheckboxComponent,
        AmstoreSelectComponent,
        AmstoreFormArrayComponent,
        AmstoreUploadFileComponent
    ]
})
export class AmstoreFormsModule { }
