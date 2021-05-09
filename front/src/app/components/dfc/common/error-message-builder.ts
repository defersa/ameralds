import { ValidationErrors } from "@angular/forms";
type TransformFunc = (value?: any) => string;
const ErrorTemplates: Record<string, TransformFunc> = {
    required: () => 'Это поле обязательно',
    minValue: (value: {current: number, expected: number}) => `Текущее значение ${value.current} меньше чем минимально ожидаемое ${value.expected}`
}

export function getControlErrors(errors: ValidationErrors | null): string | null {
    if (!errors) {
        return null;
    }
    return Object.keys(errors)
        .map((key: string) => {
            const transformFunc: TransformFunc | null = ErrorTemplates[key];
            return transformFunc ? transformFunc(errors[key]) : 'Has no template for error ' + key
        })
        .join(', ');
}