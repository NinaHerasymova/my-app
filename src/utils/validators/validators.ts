export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value: string) => {
    if (value) return;
    return 'Field is required';
}

export const maxLengthCreator = (maxlength: number): FieldValidatorType => (value: string) => {
    if (value && value.length > maxlength) return 'Too much text!!!';
    return undefined;
}

export const minLengthCreator = (minlength: number): FieldValidatorType => (value: string) => {
    if (value && value.length < minlength) return 'Too few symbols))';
    return undefined;
}
