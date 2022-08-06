import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from "@angular/material/radio";

import { AmstoreChipModule } from '../chip/chip.module';
import { AmstoreIconModule } from '../icons/icons.module';

import { AmstoreInputComponent } from './input/input.component';
import { AmstoreFormLabel } from './forms.abstract.directive';
import { AmstoreCheckboxComponent } from './checkbox/checkbox.component';
import { AmstoreSelectComponent } from './select/select.component';
import { AmstoreButtonDefaultModule } from '../buttons/default/default.module';
import { AmstoreFormArrayComponent } from './array/array.component';
import { AmstoreUploadFileComponent } from './upload-file/upload-file.component';
import { AmstoreChipsCheckboxComponent } from './chips-checkbox/chips-checkbox.component';
import { AmstoreInputPasswordComponent } from './input-password/input-password.component';

const FORM_COMPONENT: any[] = [
    AmstoreInputComponent,
    AmstoreFormLabel,
    AmstoreCheckboxComponent,
    AmstoreSelectComponent,
    AmstoreFormArrayComponent,
    AmstoreUploadFileComponent,
    AmstoreChipsCheckboxComponent,
    AmstoreInputPasswordComponent
];


@NgModule({
    declarations: FORM_COMPONENT,
    exports: FORM_COMPONENT,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        AmstoreButtonDefaultModule,
        AmstoreIconModule,
        AmstoreChipModule,
        MatRadioModule
    ]
})
export class AmstoreFormsModule {
}
