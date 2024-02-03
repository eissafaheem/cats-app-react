import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserManagementService } from "../../../client/services/user-management.service";
import { ROUTES } from "../../_shared/utils/constatnts";

const useSigninHook = () => {

    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (emailInput && passwordInput) {
            setIsDisabled(false);
            setErrorMessage("");
        }
    }, [emailInput, passwordInput])

    async function handleSignIn(event: any) {
        setIsDisabled(true);
        setIsLoading(true);
        event.preventDefault();
        const userManagementService = new UserManagementService();
        try {
            const signinResult = await userManagementService.signin(
                emailInput,
                passwordInput
            );
            if (signinResult.errorCode === 0) {
                navigate(ROUTES.home.empty);
            } else {
                setErrorMessage(signinResult.errorMessage);
            }
        } catch (err) {
            setErrorMessage("Something went wrong!");
            console.error(err)
        }
        setIsLoading(false);
        setIsDisabled(false);
    }

    function onEmailChange(event: React.FormEvent<HTMLInputElement>) {
        setEmailInput(event.currentTarget.value);
    }

    function onPasswordChange(event: React.FormEvent<HTMLInputElement>) {
        setPasswordInput(event.currentTarget.value);
    }

    return {
        isLoading,
        isDisabled,
        errorMessage,
        onPasswordChange,
        onEmailChange,
        handleSignIn
    };

}

export default useSigninHook;