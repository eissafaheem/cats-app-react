import React from "react";
import { User } from "../../../client/models/Entities/User";
import UserItemStyles from "./UserItem.module.css";
import { AVATARS } from "../utils/constatnts";
import doneIcon from "./../../../assets/done-icon.svg";

type UserItemProps = {
  onClick?: any;
  user: User;
  myEmail?: string;
};

function UserItemComponent(props: UserItemProps) {
  const { onClick, user, myEmail } = props;
  return (
    <div
      className={`${UserItemStyles["user-item"]} 
    ${myEmail === user.email && UserItemStyles["no-user"]}`}
      onClick={() => onClick(user)}
    >
      <div className={UserItemStyles["user-info"]}>
        <div className={UserItemStyles["info"]}>
          <div className={UserItemStyles["profile-picture"]}>
            <img src={AVATARS[user.avatarId]} alt="User Avatar" />
          </div>
          <div className={UserItemStyles["user-text"]}>
            <h4>{user.name}</h4>
            <span>{user.email}</span>
          </div>
        </div>
        {user.isSelected && (
          <div className={UserItemStyles["selected"]}>
            <img src={doneIcon} alt="Selected" />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserItemComponent;
