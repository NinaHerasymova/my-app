import React from 'react'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import s from '../common/FormsControl/FormsControl.module.css';
import {createField, CreateField, Input} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {logIn, logOut} from "../../redux/authReducer";

const maxLengthCreator35 = maxLengthCreator(35);
const minLengthCreator4 = minLengthCreator(4)

export const LoginForm = ({handleSubmit, error}) => {
  return <form onSubmit={handleSubmit}>
    {createField("email", "Login", Input,  [required, maxLengthCreator35, minLengthCreator4], {type: "text"})}
    {createField("password", "Password", Input,  [required, maxLengthCreator35, minLengthCreator4], {type: "password"})}
    {createField("rememberMe", "input", Input,  null, {type: "checkbox"}, "Remember me")}
    {error && <div className={s.formSummaryError}>{error}</div>}
    <div>
      <button>Log in</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = ({logIn, isAuth}) => {

  const onSubmit = (formData) => {
    logIn(formData.email, formData.password, formData.rememberMe)
  }

  if (isAuth) {
    return <Redirect to="/profile"/>
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {logIn, logOut})(Login)
