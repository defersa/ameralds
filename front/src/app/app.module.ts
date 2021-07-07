import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreInterceptor } from './store.interceptor';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './components/profile/profile.module';
import { AuthService } from './services/auth.service';
import { GoodsService } from './services/goods.service';
import { ProfileService } from './services/profile.service';
import { HeaderComponent } from './components/header/header.component';
import { GoodsModule } from './components/goods/goods.module';
import { RouterService } from './services/router.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        ProfileModule,
        GoodsModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: StoreInterceptor, multi: true },
        AuthService,
        GoodsService,
        ProfileService,
        RouterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
