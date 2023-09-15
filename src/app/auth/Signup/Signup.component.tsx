import React, { useState } from 'react'
import SignupStyles from './Signup.module.css'
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../_shared/components/button/Button.component';
import InputComponent from '../../_shared/components/input/Input.component';
import { ROUTES } from '../../_shared/utils/constatnts';

function SignupComponent() {

  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState<string>("");

  function handleSignup() {
    navigate(ROUTES.home)
  }

  function routeToSignup(){
    navigate(ROUTES.signin)
  }
  
  return (
    <div className={SignupStyles['signup-container']}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className={SignupStyles['input']}>
          <InputComponent placeholder='Email' setValue={setEmailInput} />
        </div>
        <div className={SignupStyles['input']}>
          <InputComponent placeholder='Password' setValue={setEmailInput} />
        </div>
        <div className={SignupStyles['input']}>
          <ButtonComponent onClick={handleSignup} text='Sign In' />
        </div>
      </form>
      <div className={SignupStyles["signup"]}>
        Already have an account? <a onClick={routeToSignup}>Signin</a>
      </div>
    </div>

  )
}

export default SignupComponent
