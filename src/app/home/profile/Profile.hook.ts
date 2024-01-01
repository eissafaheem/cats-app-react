import { useState } from "react";
import { UserManagementService } from "../../../client/services/user-management.service";
import { ProfileProps } from "./Profile.component";
import { User } from "../../../client/models/Entities/User";
import { LocalKeys, LocalStorage } from "../../../client/models/classes/businessLogic/LocalStorage";
import { useTypedSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import {setUserDetails} from '../../../redux/slices/userSlice'

export const useProfileHook = (props: ProfileProps) => {

    let { setIsProfileVisible } = props;
    const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
    const selectors = useTypedSelector(state=>state);
    const user = selectors.userReducer.userDetails;
    const [name, setName] = useState<string>(user.name || "");
    const [email, setEmail] = useState<string>(user.email || "");
    const [password, setPassword] = useState<string>("");
    const [avatarId, setAvatarId] = useState<number>(+user.avatarId);
    const dispatch = useDispatch();

    function setMyDetails(userDetails: User){
        dispatch(setUserDetails(userDetails));
    }

    function logoutUser() {

    }

    function handleProfileButtonClick() {
        if (isEditProfile) {
            updateProfile()
        }
        else {
            setIsEditProfile(true);
        }
    }

    async function updateProfile() {
        const userManagementService = new UserManagementService();
        const updateUser = new User(user._id, name, email, password, avatarId)
        console.log(updateUser)
        const updateUserResult = await userManagementService.updateUser(updateUser);
        if (updateUserResult.errorCode === 0) {
            new LocalStorage().setData(LocalKeys.USER_DETAILS, updateUserResult.user);
            setIsEditProfile(false);
            setMyDetails(updateUserResult.user);
        }
    }

    function handleAvatarSelect(index: number) {
        if (isEditProfile && user.pawints >= ((index + 1) * 10)) {
            setAvatarId(index);
        }
    }

    function onNameChange(event: React.FormEvent<HTMLInputElement>) {
        setName(event.currentTarget.value)
    }

    const onEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

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
        setAvatarId,
        avatarId,
        handleAvatarSelect,
        onNameChange,
        onEmailChange,
        onPasswordChange
    };
}