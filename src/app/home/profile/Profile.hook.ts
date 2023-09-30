import { useState } from "react";
import { UserManagementService } from "../../../client/services/user-management.service";
import { ProfileProps } from "./Profile.component";
import { User } from "../../../client/models/Entities/User";
import { LocalKeys, LocalStorage } from "../../../client/models/classes/businessLogic/LocalStorage";

export const useProfileHook = (props: ProfileProps) =>{

    let { user, setIsProfileVisible, setUserDetails } = props;
    const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [avatarId, setAvatarId] = useState<number>(0);

    function logoutUser(){

    }

    function handleProfileButtonClick(){
        if(isEditProfile){
            updateProfile()
        }
        else{
            setIsEditProfile(true);
        }
    }
    
    async function updateProfile(){
        const userManagementService = new UserManagementService();
        const updateUser = new User(user._id, name, email, password, avatarId)
        console.log(updateUser)
        const updateUserResult = await  userManagementService.updateUser(updateUser);
        if(updateUserResult.errorCode===0){
            new LocalStorage().setData(LocalKeys.USER_DETAILS, updateUserResult.user);
            setIsEditProfile(false);
            setUserDetails(updateUserResult.user);
        }
    }

    return {
        logoutUser,
        isEditProfile,
        setIsEditProfile,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        handleProfileButtonClick,
        user,
        setIsProfileVisible,
        setAvatarId
    };
}