import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { JewelryCardComponent } from './pages/jewelry-card/jewelry-card.component';
import { PatternsComponent } from './pages/pattern/patterns/patterns.component';
import { PatternCardComponent } from './pages/pattern/pattern-card/pattern-card.component';
import { PatternAddComponent } from './pages/pattern/pattern-add/pattern-add.component';
import { getStoreRoutePath, StoreRoutes } from 'src/app/utils/router-builder';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';
import { AmstoreSharedModule } from '@am/shared/shared.module';
import { CategoriesComponent } from './pages/category/categories/categories.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';
import { SizesComponent } from './pages/sizes/sizes/sizes.component';
import { SizeEditComponent } from './pages/sizes/size-edit/size-edit.component';
import { AmstoreCanActivatePage } from "../../store.guard";


export const routes: Routes = [{
    path: '',
    component: StoreComponent,
    children: [
        {
            path: '',
            component: PatternsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.PatternCard),
            component: PatternCardComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.PatternAdd),
            component: PatternAddComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.PatternEdit),
            component: PatternAddComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.Patterns),
            component: PatternsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.Jewelrys),
            component: JewelryComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.Categories),
            component: CategoriesComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.CategoryEdit),
            component: CategoryEditComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.CategoryAdd),
            component: CategoryEditComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.Sizes),
            component: SizesComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.SizeEdit),
            component: SizeEditComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: getStoreRoutePath(StoreRoutes.SizeAdd),
            component: SizeEditComponent,
            canActivate: [AmstoreCanActivatePage]
        }
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
        CategoriesComponent,
        CategoryEditComponent,
        SizesComponent,
        SizeEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        AmstoreCdkModule,
        AmstoreSharedModule
    ]
})
export class StoreModule { }
