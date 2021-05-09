import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidatorFns {
    public static getMinValue: (value: number) => ValidatorFn = function (value: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control) {
                return null;
            }
            if(Number(control.value) < value) {
                return { minValue: {current: control.value, expected: value}};
            }
            return null;
        }
    }
}