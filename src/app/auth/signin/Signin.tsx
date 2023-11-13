import React, { useState } from "react";
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

function SigninComponent() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  async function handleSignIn(event: any) {
    event.preventDefault();
    const userManagementService = new UserManagementService();
    try {
      const signinResult = await userManagementService.signin(
        emailInput,
        passwordInput
      );
      if (signinResult.errorCode === 0) {
        navigate(ROUTES.home);
      } else {
        alert(signinResult.errorMessage);
      }
    } catch (err) {
      alert("Something went wrong!");
      console.error(err)
    }
  }

  function onEmailChange(event: React.FormEvent<HTMLInputElement>){
    setEmailInput(event.currentTarget.value);
  }

  function onPasswordChange(event: React.FormEvent<HTMLInputElement>){
    setPasswordInput(event.currentTarget.value);
  }

  return (
    <div className={SigninStyles["signin-container"]}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className={SigninStyles["input"]}>
          <InputComponent placeholder="Email" onChange={onEmailChange} />
        </div>
        <div className={SigninStyles["input"]}>
          <InputComponent placeholder="Password" onChange={onPasswordChange} type="password"/>
        </div>
        <div className={SigninStyles["input"]}>
          <ButtonComponent onClick={handleSignIn} text="Sign In" />
        </div>
      </form>
      <div className={SigninStyles["signup"]}>
        Don't have an account? <Link to={ROUTES.signup}>Signup</Link>
      </div>
    </div>
  );
}

export default SigninComponent;
