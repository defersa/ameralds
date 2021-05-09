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
import { PatternAddComponent } from './pages/pattern-add/pattern-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DfcModule } from 'src/app/components/dfc/dfc.module';


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
            path: StoreRoutes.PatternAdd,
            component: PatternAddComponent,
        },
        {
            path: StoreRoutes.PatternEdit,
            component: PatternAddComponent,
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
    declarations: [StoreComponent, MenuComponent, JewelryComponent, JewelryCardComponent, PatternsComponent, PatternCardComponent, PatternAddComponent],
    imports: [
        RouterModule.forChild(routes),
        PaginatorModule,
        CommonModule,
        ReactiveFormsModule,
        DfcModule
    ]
})
export class StoreModule { }
