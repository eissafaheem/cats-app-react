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
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInvalidEmail, setisInvalidEmail] = useState<boolean>(false);

    useEffect(() => {
        validateForm();
    }, [name, password, email, confirmPassword])

    function validateForm() {
        if (name && email && password && isPasswordsMatch && !isInvalidEmail) {
            setIsDisabled(false);
            setErrorMessage("");
            return;
        }
        if (!isPasswordsMatch) {
            setErrorMessage("Passwords do not match!")
        }
        if(isInvalidEmail){
            setErrorMessage("Invalid email!")
        }
        setIsDisabled(true);
    }

    async function handleSignup(event: any) {
        setIsLoading(true);
        setIsDisabled(true);
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
        setIsDisabled(false);
        setIsLoading(false);
    }

    function onNameChange(event: React.FormEvent<HTMLInputElement>) {
        setName(event.currentTarget.value)
    }

    const onEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
        validateEmail(event.currentTarget.value);
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setisInvalidEmail(true);
        } else {
            setisInvalidEmail(false);
        }
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        let confirmPasswordCurrValue = event.currentTarget.value;
        if (confirmPasswordCurrValue !== password) {
            setIsPasswordsMatch(false);
        } else {
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
        isDisabled,
        isLoading
    };
}
export default useSignupHook;