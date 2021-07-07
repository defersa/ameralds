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
import { PatternAddComponent } from './pages/pattern-add/pattern-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DfcModule } from 'src/app/components/dfc/dfc.module';
import { ImagesComponent } from './pages/images/images.component';
import { ImageViewerComponent } from './pages/images/image-viewer/image-viewer.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { PaginatedPageModule } from 'src/app/components/paginated-page/paginated-page.module';
import { getStoreRoutePath, StoreRoutes } from 'src/app/utils/router-builder';


export const routes: Routes = [{
    path: '',
    component: StoreComponent,
    children: [
        {
            path: '',
            component: PatternsComponent,
        },
        {
            path: getStoreRoutePath(StoreRoutes.PatternCard),
            component: PatternCardComponent,
        },
        {
            path: getStoreRoutePath(StoreRoutes.PatternAdd),
            component: PatternAddComponent,
        },
        {
            path: getStoreRoutePath(StoreRoutes.PatternEdit),
            component: PatternAddComponent,
        },
        {
            path: getStoreRoutePath(StoreRoutes.Patterns),
            component: PatternsComponent,
        },
        {
            path: getStoreRoutePath(StoreRoutes.Jewelrys),
            component: JewelryComponent,
        },
        {
            path: getStoreRoutePath(StoreRoutes.Images),
            component: ImagesComponent,
        },
    ]
}]

@NgModule({
    declarations: [
        StoreComponent,
        MenuComponent,
        JewelryComponent,
        JewelryCardComponent,
        PatternsComponent,
        PatternCardComponent,
        PatternAddComponent,
        ImagesComponent,
        ImageViewerComponent],
    imports: [
        RouterModule.forChild(routes),
        PaginatorModule,
        CommonModule,
        ReactiveFormsModule,
        DfcModule,
        ProductCardModule,
        PaginatedPageModule
    ]
})
export class StoreModule { }
