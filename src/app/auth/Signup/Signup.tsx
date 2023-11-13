import React, { useState } from "react";
import SignupStyles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../_shared/components/button/Button.component";
import InputComponent from "../../_shared/components/input/Input.component";
import { ROUTES } from "../../_shared/utils/constatnts";
import { UserManagementService } from "../../../client/services/user-management.service";
import { User } from "../../../client/models/Entities/User";
import useSignupHook from "./Signup.hook";

function SignupComponent() {

  const {
    handleSignup,
    onNameChange,
    onEmailChange,
    onConfirmPasswordChange,
    onPasswordChange,
    errorMessage,
    isDisabled
  } = useSignupHook();

  return (
    <div className={SignupStyles["signup-container"]}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Name" onChange={onNameChange} />
        </div>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Email" onChange={onEmailChange} />
        </div>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Password" onChange={onPasswordChange} type={"password"} />
        </div>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Confirm Password" onChange={onConfirmPasswordChange} type={"password"} />
        </div>
        <p className={SignupStyles["error-message"]}>{errorMessage}</p>
        <div className={SignupStyles["input"]}>
          <ButtonComponent onClick={handleSignup} text="Sign Up" isDisabled={isDisabled}/>
        </div>
      </form>
      <div className={SignupStyles["signup"]}>
        Already have an account? <Link to={ROUTES.signin}>Signin</Link>
      </div>
    </div>
  );
}

export default SignupComponent;
