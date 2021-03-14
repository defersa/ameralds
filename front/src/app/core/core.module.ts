import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './auth/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';



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
