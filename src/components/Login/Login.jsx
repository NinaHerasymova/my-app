import React from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import s from '../common/FormsControl/FormsControl.module.css';
import {createField, Input} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {logIn, logOut} from "../../redux/authReducer";

const maxLengthCreator35 = maxLengthCreator(35);
const minLengthCreator4 = minLengthCreator(4)

export const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return <form onSubmit={handleSubmit}>
    {createField("email", "Login", Input,  [required, maxLengthCreator35, minLengthCreator4], {type: "text"})}
    {createField("password", "Password", Input,  [required, maxLengthCreator35, minLengthCreator4], {type: "password"})}
    {createField("rememberMe", "input", Input,  null, {type: "checkbox"}, "Remember me")}

    {captchaUrl && <img src={captchaUrl} alt={"captcha"}/>}
    {captchaUrl && createField("captcha", "enter captcha...", Input, [required], {type: "text"})}

    {error && <div className={s.formSummaryError}>{error}</div>}
    <div>
      <button>Log in</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = ({logIn, isAuth, captchaUrl}) => {

  const onSubmit = (formData) => {
    logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (isAuth) {
    return <Redirect to="/profile"/>
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
  </div>
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})
export default connect(mapStateToProps, {logIn, logOut})(Login)
