import React from 'react'
import AuthStyles from './Auth.module.css'
import { Outlet } from 'react-router-dom'
import brandLogo from './../../assets/brand-logo.svg'
import catPaw from './../../assets/cat_paw.png'

function AuthComponent() {
  return (
    <div className={AuthStyles['auth-container']}>
      <img src={catPaw} alt="Paw" id={AuthStyles["paw"]} />
      <div className={AuthStyles["brand-info"]}>
        <div className={AuthStyles["heading"]}>
          <img src={brandLogo} alt="Meow" />
          <h1>Meow: Cat's App</h1>
        </div>
        <div className={AuthStyles["content"]}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam soluta eius fugit dolore, at in 
        </div>
      </div>
      <div className={AuthStyles["form-container"]}>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthComponent
