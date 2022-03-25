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
    public static getNotUniqValue: (values: unknown[]) => ValidatorFn = function (values: unknown[]): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control) {
                return null;
            }
            if(values.includes(control.value)) {
                return { notUniq: {value: control.value }};
            }
            return null;
        }
    }
}
