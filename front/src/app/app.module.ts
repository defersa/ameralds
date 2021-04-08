import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreInterceptor } from './store.interceptor';
import { CoreModule } from './core/core.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: StoreInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
