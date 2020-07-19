import React from "react"
import s from './FormsControl.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../utils/validators/validators"
import {LoginFormValuesType} from '../../Login/Login'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = error && touched
    return <div className={s.formControl + " " + (hasError ? s.error : null)}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input}{...restProps}/>
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input}{...restProps}/>
    </FormControl>
}

export function createField<FormKeysType extends string> (name: FormKeysType,
                            placeholder: string | undefined,
                            component: React.FC<WrappedFieldProps>,
                            validate: Array<FieldValidatorType> | undefined,
                            props = {},
                            text= "") {
    return <div><Field name={name}
                       placeholder={placeholder}
                       component={component}
                       validate={validate}
                       {...props}/>{text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>
