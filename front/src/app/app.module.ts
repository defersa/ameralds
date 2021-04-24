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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        ProfileModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: StoreInterceptor, multi: true },
        AuthService,
        GoodsService,
        ProfileService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
