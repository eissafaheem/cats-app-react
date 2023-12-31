import { SearchUserResult, SignUpResult, SigninResult, UpdateUserResult } from "../models/Entities/RestResults";
import { User } from "../models/Entities/User";
import { UserManagementClient } from "../models/classes/businessLogic/UserManagementClient";

export class UserManagementService{

    userManagementClient: UserManagementClient;
    constructor(){
        this.userManagementClient = new UserManagementClient();
    }

    signup(user: User):  Promise<SignUpResult>{
        return this.userManagementClient.signUp(user);
    }

    signin(email: string, password: string): Promise<SigninResult>{
        return this.userManagementClient.signIn(email, password);
    }

    searchUser(token: string): Promise<SearchUserResult>{
        return this.userManagementClient.searchUser(token);
    }

    updateUser(user: User): Promise<UpdateUserResult>{
        return this.userManagementClient.updateUser(user);
    }
    
}