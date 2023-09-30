import React, { useEffect } from "react";
import ProfileStyles from "./Profile.module.css";
import { User } from "../../../client/models/Entities/User";
import {
  LocalKeys,
  LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";
import { AVATARS } from "../../_shared/utils/constatnts";
import ButtonComponent from "../../_shared/components/button/Button.component";
import { useProfileHook } from "./Profile.hook";
import InputComponent from "../../_shared/components/input/Input.component";

type ProfileProps = {
  user: User;
};

function ProfileComponent(props: ProfileProps) {
  let { user } = props;
  const {
    logoutUser,
    isEditProfile,
    setIsEditProfile,
    name,
    setName,
    email,
    handleProfileButtonClick,
    password,
    setEmail,
    setPassword
  } = useProfileHook();

  return (
    <div className={ProfileStyles["profile-container"]}>
      <div className={ProfileStyles["close-div"]}></div>
      <div className={ProfileStyles["modal"]}>
        <header>
          <div className={ProfileStyles["user-info"]}>
            <img src={AVATARS[user.avatarId]} alt="user avatar" />
            <div className={ProfileStyles["details"]}>
              <h1>{user.name}</h1>
              <h3>{user.pawints} Pawints</h3>
            </div>
          </div>
          <ButtonComponent text="Logout" onClick={logoutUser} />
        </header>
        <div className={ProfileStyles["content"]}>
          <div className={ProfileStyles["avatars"]}>
            {AVATARS.map((avatar: string, index: number) => {
              return (
                <div
                  className={`${ProfileStyles["avatar"]} ${user.pawints < (index + 1) * 10 &&
                    ProfileStyles["locked-avatar"]
                    }`}
                >
                  <img src={avatar} alt="user avatar" />
                  {(index + 1) * 10}
                </div>
              );
            })}
          </div>
          <div className={ProfileStyles["user-info"]}>
            <div className="user-name">
              <span>Name </span>
              {
                isEditProfile
                  ?
                  <InputComponent placeholder="Name" setValue={setName} />
                  :
                  <>
                    {user.name}
                  </>
              }
            </div>
            <div className="user-email">
              <span>Email </span>
              {
                isEditProfile
                  ?
                  <InputComponent placeholder="Email" setValue={setEmail} />
                  :
                  <>
                    {user.email}
                  </>
              }
            </div>
            <div className="user-password">
              <span>Password </span>
              {
                isEditProfile
                  ?
                  <InputComponent placeholder="Password" setValue={setPassword} />
                  :
                  <>
                    ********
                  </>
              }
            </div>
          </div>
        </div>
        <footer>
          <ButtonComponent text={isEditProfile?"Save Profile":"Edit Profile"} onClick={handleProfileButtonClick} />
        </footer>
      </div>
    </div>
  );
}

export default ProfileComponent;
