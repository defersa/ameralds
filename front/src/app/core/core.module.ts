import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth/auth.component';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './auth/auth.service';



@NgModule({
    declarations: [
        AuthComponent
    ],
    providers: [
        LocalStorageService,
        AuthService
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthComponent
    ]
})
export class CoreModule { }
