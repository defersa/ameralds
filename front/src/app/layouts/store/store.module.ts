import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { JewelryCardComponent } from './pages/jewelry-card/jewelry-card.component';
import { PatternsComponent } from './pages/patterns/patterns.component';
import { PatternCardComponent } from './pages/pattern-card/pattern-card.component';
import { PaginatorModule } from 'src/app/components/paginator/paginator.module';
import { StoreRoutes } from 'src/app/utils/routs-name';


export const routes: Routes = [{
    path: '',
    component: StoreComponent,
    children: [
        {
            path: '',
            component: PatternsComponent,
        },
        {
            path: StoreRoutes.PatternCard,
            component: PatternCardComponent,
        },
        {
            path: StoreRoutes.Patterns,
            component: PatternsComponent,
        },
        {
            path: StoreRoutes.Jewelrys,
            component: JewelryComponent,
        },
    ]
}]

@NgModule({
    declarations: [StoreComponent, MenuComponent, JewelryComponent, JewelryCardComponent, PatternsComponent, PatternCardComponent],
    imports: [
        RouterModule.forChild(routes),
        PaginatorModule,
        CommonModule
    ]
})
export class StoreModule { }
