import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import s from '../common/FormsControl/FormsControl.module.css';
import {createField, GetStringKeys, Input} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {logIn, logOut} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const maxLengthCreator35 = maxLengthCreator(35);
const minLengthCreator4 = minLengthCreator(4)

export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>("email", "Email", Input, [required, maxLengthCreator35, minLengthCreator4])}
        {createField<LoginFormValuesTypeKeys>("password", "Password", Input, [required, maxLengthCreator35, minLengthCreator4], {type: "password"})}
        {createField<LoginFormValuesTypeKeys>("rememberMe", "input", Input, undefined, {type: "checkbox"}, "Remember me")}

        {captchaUrl && <img src={captchaUrl} alt={"captcha"}/>}
        {captchaUrl && createField<LoginFormValuesTypeKeys>("captcha", "enter captcha...", Input, [required])}

        {error && <div className={s.formSummaryError}>{error}</div>}
        <div>
            <button>Log in</button>
        </div>
    </form>
}

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean

}

type MapDispatchPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})
export default connect(mapStateToProps, {logIn})(Login)
