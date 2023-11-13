import React, { useEffect, useState } from "react";
import SigninStyles from "./Signin.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import ButtonComponent from "../../_shared/components/button/Button.component";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../_shared/utils/constatnts";
import {
  Method,
  RestCalls,
} from "../../../client/models/classes/businessLogic/RestCalls";
import { User } from "../../../client/models/Entities/User";
import { UserManagementService } from "../../../client/services/user-management.service";
import { error } from "console";
import { SigninResult } from "../../../client/models/Entities/RestResults";
import useSigninHook from "./Signin.hook";

function SigninComponent() {
  
  const { 
    isLoading,
    isDisabled,
    errorMessage,
    onPasswordChange,
    onEmailChange,
    handleSignIn
  } = useSigninHook();

  return (
    <div className={SigninStyles["signin-container"]}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className={SigninStyles["input"]}>
          <InputComponent placeholder="Email" onChange={onEmailChange} />
        </div>
        <div className={SigninStyles["input"]}>
          <InputComponent placeholder="Password" onChange={onPasswordChange} type="password" />
        </div>
        <p className={SigninStyles["error-message"]}>{errorMessage}</p>
        <div className={SigninStyles["input"]}>
          <ButtonComponent onClick={handleSignIn} text="Sign In" isDisabled={isDisabled} isLoading={isLoading} />
        </div>
      </form>
      <div className={SigninStyles["signup"]}>
        Don't have an account? <Link to={ROUTES.signup}>Signup</Link>
      </div>
    </div>
  );
}

export default SigninComponent;
