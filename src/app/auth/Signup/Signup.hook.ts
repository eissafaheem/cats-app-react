import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../client/models/Entities/User";
import { UserManagementService } from "../../../client/services/user-management.service";
import { ROUTES } from "../../_shared/utils/constatnts";

const useSignupHook = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

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

    return {
        handleSignup,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword
    };
}
export default useSignupHook;