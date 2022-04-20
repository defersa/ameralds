import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ArrayComponentListService } from "./array-component-list.service";

@Injectable({
    providedIn: 'root'
})
export class ArratValidatorFns {
    constructor(
        private _arrayComponentList: ArrayComponentListService
    ) { }
    
    public getNotUniqValue(controlName: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control) {
                return null;
            }
            let controlList: FormControl[] | undefined = this._arrayComponentList.getControls(controlName);

            if(controlList) {
                controlList = controlList.filter((item: FormControl) => item !== control);

                return controlList.some((item: FormControl) => item.value === control.value)
                    ? { notUniq: {value: control.value }}
                    : null;
            }
            return null;
        }
    }
}
