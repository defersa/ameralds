import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [
        CommonModule,
        CoreModule
    ]
})
export class ProfileModule { }
