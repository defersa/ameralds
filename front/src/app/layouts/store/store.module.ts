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
import { SectionEnum, StoreRoutes } from 'src/app/utils/router-builder';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';
import { AmstoreSharedModule } from '@am/shared/shared.module';
import { CategoriesComponent } from './pages/category/categories/categories.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';
import { SizesComponent } from './pages/sizes/sizes/sizes.component';
import { SizeEditComponent } from './pages/sizes/size-edit/size-edit.component';
import { AmstoreCanActivatePage } from "../../store.guard";


export const routes: Routes = [{
    path: SectionEnum.Store,
    component: StoreComponent,
    children: [
        {
            path: '',
            redirectTo: StoreRoutes.Patterns,
            component: PatternsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.Patterns,
            component: PatternsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.PatternCard + '/:id',
            component: PatternCardComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.PatternAdd,
            component: PatternAddComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.PatternEdit + '/:id',
            component: PatternAddComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.Jewelrys,
            component: JewelryComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.Categories,
            component: CategoriesComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.CategoryEdit + '/:id',
            component: CategoryEditComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.CategoryAdd,
            component: CategoryEditComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.Sizes,
            component: SizesComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.SizeEdit + '/:id',
            component: SizeEditComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: StoreRoutes.SizeAdd,
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
