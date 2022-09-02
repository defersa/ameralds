import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreInterceptor } from './store.interceptor';
import { CoreModule } from './core/core.module';
import { AuthService } from './services/auth.service';
import { GoodsService } from './services/goods.service';
import { ProfileService } from './services/profile.service';
import { PermissionsService } from '@am/services/permissions.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: StoreInterceptor, multi: true },
        AuthService,
        GoodsService,
        ProfileService,
        PermissionsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
