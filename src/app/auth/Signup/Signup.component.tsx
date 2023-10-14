import React, { useState } from "react";
import SignupStyles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../_shared/components/button/Button.component";
import InputComponent from "../../_shared/components/input/Input.component";
import { ROUTES } from "../../_shared/utils/constatnts";
import { UserManagementService } from "../../../client/services/user-management.service";
import { User } from "../../../client/models/Entities/User";

function SignupComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignup(event: any) {
    event.preventDefault();
    const userManagementService = new UserManagementService();
    try {
      const newUser = new User(null, name, email, password, 0, 10);
      const signUpResult = await userManagementService.signup(newUser);
      if (signUpResult.errorCode === 0) {
        alert("Signup successfull! Please signin");
      } else {
        alert(signUpResult.errorMessage);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  }

  function routeToSignup() {
    navigate(ROUTES.signin);
  }

  return (
    <div className={SignupStyles["signup-container"]}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Name" setValue={setName} />
        </div>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Email" setValue={setEmail} />
        </div>
        <div className={SignupStyles["input"]}>
          <InputComponent placeholder="Password" setValue={setPassword} type={"password"}/>
        </div>
        <div className={SignupStyles["input"]}>
          <ButtonComponent onClick={handleSignup} text="Sign Up" />
        </div>
      </form>
      <div className={SignupStyles["signup"]}>
        Already have an account? <a onClick={routeToSignup}>Signin</a>
      </div>
    </div>
  );
}

export default SignupComponent;
