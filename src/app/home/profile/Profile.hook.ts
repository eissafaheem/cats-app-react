import { useState } from "react";

export const useProfileHook = () =>{

    const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
    
    function updateProfile(){
        setIsEditProfile(false);

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
        handleProfileButtonClick
    };
}