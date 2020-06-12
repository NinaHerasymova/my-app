import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {logIn, logOut} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const maxLengthCreator35 = maxLengthCreator(35);
const minLengthCreator4 = minLengthCreator(4)

export const LoginForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field name="email" placeholder={"Login"} component={Input} type="text"
             validate={[required, maxLengthCreator35, minLengthCreator4]}/>
    </div>
    <div>
      <Field name="password" placeholder={"Password"} component={Input} type="password"
             validate={[required, maxLengthCreator35, minLengthCreator4]}/>
    </div>
    <div>
      <Field name="rememberMe" component="input" type="checkbox"/>Remember me
    </div>
    <div>
      <button type="submit" onClick={props.onSubmit}>Log in</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = (props) => {

  const onSubmit = (formData) => {
    props.logIn(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) {
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
