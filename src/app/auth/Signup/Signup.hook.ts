import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../client/models/Entities/User";
import { UserManagementService } from "../../../client/services/user-management.service";
import { ROUTES } from "../../_shared/utils/constatnts";

const useSignupHook = () => {

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(false);
    
    useEffect(() => {
        console.log(name , email , password , confirmPassword)
        if (name && email && password && isPasswordsMatch) {
            setIsDisabled(false);
        }
        else{
            setIsDisabled(true);
        }
    }, [name, password, email, confirmPassword])

    async function handleSignup(event: any) {
        event.preventDefault();
        const userManagementService = new UserManagementService();
        try {
            const newUser = new User(null, name, email, password, 0, 10);
            const signUpResult = await userManagementService.signup(newUser);
            if (signUpResult.errorCode === 0) {
                setErrorMessage(signUpResult.errorMessage)
            } else {
                setErrorMessage(signUpResult.errorMessage)
            }
        } catch (err) {
            setErrorMessage("Something went wrong!")
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

    const onConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        let confirmPasswordCurrValue = event.currentTarget.value;
        if (confirmPasswordCurrValue !== password) {
            setErrorMessage("Passwords do not match!");
            setIsPasswordsMatch(false);
        } else {
            setErrorMessage("");
            setIsPasswordsMatch(true)
        }
        setConfirmPassword(event.currentTarget.value);
    };

    return {
        handleSignup,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        onNameChange,
        onEmailChange,
        onConfirmPasswordChange,
        onPasswordChange,
        errorMessage,
        isDisabled
    };
}
export default useSignupHook;