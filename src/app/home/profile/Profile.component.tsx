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

export type ProfileProps = {
  setIsProfileVisible: React.Dispatch<React.SetStateAction<boolean>>
};

function ProfileComponent(props: ProfileProps) {

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
    setPassword,
    setIsProfileVisible,
    user,
    setAvatarId,
    avatarId,
    handleAvatarSelect,
    onNameChange,
    onEmailChange,
    onPasswordChange
  } = useProfileHook(props);

  return (
    <div className={ProfileStyles["profile-container"]}>
      <div className={ProfileStyles["close-div"]} onClick={() => setIsProfileVisible(false)}></div>
      <div className={ProfileStyles["modal"]}>
        <header>
          <div className={ProfileStyles["user-info"]}>
            <img src={AVATARS[avatarId]} alt="user avatar" />
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
                  key={index}
                  className={`
                    ${ProfileStyles["avatar"]} 
                    ${user.pawints < (index + 1) * 10 && ProfileStyles["locked-avatar"]}
                    ${avatarId === index && ProfileStyles['selected-avatar']}`
                  }
                  onClick={() => { handleAvatarSelect(index) }}
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
                  <InputComponent placeholder="Name" onChange={onNameChange} value={name} />
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
                  <InputComponent placeholder="Email" onChange={onEmailChange} value={email} />
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
                  <InputComponent placeholder="Password" onChange={onPasswordChange} />
                  :
                  <>
                    ********
                  </>
              }
            </div>
          </div>
        </div>
        <footer>
          <ButtonComponent text={isEditProfile ? "Save Profile" : "Edit Profile"} onClick={handleProfileButtonClick} />
        </footer>
      </div>
    </div>
  );
}

export default ProfileComponent;
