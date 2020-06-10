import React from 'react'
import {Field, reduxForm} from "redux-form";

export const LoginForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field name="Login" placeholder={"Login"} component="input" type="text"/>
    </div>
    <div>
      <Field name="Password" placeholder={"Password"} component="input" type="password"/>
    </div>
    <div>
      <Field name="Remember me" component="input" type="checkbox"/>Remember me
    </div>
    <div>
      <button type="submit" onClick={props.onSubmit}>Log in</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

export const Login = (props) => {

  const onSubmit = (formData) => {
    console.log(formData)
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}
