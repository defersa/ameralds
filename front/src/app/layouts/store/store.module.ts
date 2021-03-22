import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [{
        path: '', component: StoreComponent, children: [

        ]
    }]

@NgModule({
    declarations: [StoreComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class StoreModule { }
