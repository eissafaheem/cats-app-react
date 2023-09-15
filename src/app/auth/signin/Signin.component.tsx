import React, { useState } from 'react'
import SigninStyles from './Signin.module.css'
import InputComponent from '../../_shared/components/input/Input.component'
import ButtonComponent from '../../_shared/components/button/Button.component';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../_shared/utils/constatnts';

function SigninComponent() {

  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState<string>("");

  function handleSignIn() {
    navigate(ROUTES.home)
  }

  function routeToSignup(){
    navigate(ROUTES.signup)
  }

  return (
    <div className={SigninStyles['signin-container']}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className={SigninStyles['input']}>
          <InputComponent placeholder='Email' setValue={setEmailInput} />
        </div>
        <div className={SigninStyles['input']}>
          <InputComponent placeholder='Password' setValue={setEmailInput} />
        </div>
        <div className={SigninStyles['input']}>
          <ButtonComponent onClick={handleSignIn} text='Sign In' />
        </div>
      </form>
      <div className={SigninStyles["signup"]}>
        Don't have an account? <a onClick={routeToSignup}>Signup</a>
      </div>
    </div>
  )
}

export default SigninComponent