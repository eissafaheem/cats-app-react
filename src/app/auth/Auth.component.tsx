import React from 'react'
import AuthStyles from './Auth.module.css'
import { Outlet } from 'react-router-dom'
import brandLogo from './../../assets/brand-logo.svg'
import catPaw from './../../assets/cat_paw.png'

function AuthComponent() {
  return (
    <div className={AuthStyles['auth-container']}>
      <div className={AuthStyles["brand-info"]}>
        <div className={AuthStyles["heading"]}>
          <img src={brandLogo} alt="Meow" />
          <h1>Meow: Chat App</h1>
        </div>
        <div className={AuthStyles["content"]}>
          Purr-fectly Social Application Conversations Earn Paw-ints and <br />Cat Avatars Come to Life!
        </div>
      </div>
      <div className={AuthStyles["form-container"]}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthComponent
