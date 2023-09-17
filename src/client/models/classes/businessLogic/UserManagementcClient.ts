import { environment } from "../../../../environment";
import { SearchUserResult, SignUpResult, SigninResult } from "../../Entities/RestResults";
import { User } from "../../Entities/User";
import { LocalKeys, LocalStorage } from "./LocalStorage";
import { Method, RestCalls } from "./RestCalls";

export class UserManagementClient {
  restCalls: RestCalls;
  USER_ROUTE: string = "/user";
  constructor() {
    this.restCalls = new RestCalls();
  }

  signUp(user: User): Promise<SignUpResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.USER_ROUTE}/signup`;
        const addedUser: User = await this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          user
        );
        let signupResult = new SignUpResult();
        if (addedUser) {
          signupResult.errorCode = 0;
          signupResult.errorMessage = "Signup successfull!";
          signupResult.user = addedUser;
          resolve(signupResult);
        } else {
          signupResult.errorCode = 1;
          signupResult.errorMessage = "Signup failed!";
          signupResult.user = user;
          reject(addedUser);
        }
      } catch (err) {
        let signinResult = new SigninResult();
        signinResult.errorCode = 1;
        signinResult.errorMessage = "Something went wrong!";
        reject(signinResult);
      }
    });
  }

  signIn(email: string, password: string): Promise<SigninResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.USER_ROUTE}/signin`;
        const restResponse = await this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          { email, password }
        );
        const accessToken = restResponse.accessToken;
        const userDetails = restResponse.user;
        let signinResult = new SigninResult();
        if (accessToken && userDetails) {
          const localStore = new LocalStorage();
          localStore.setData(LocalKeys.ACCESS_TOKEN, accessToken);
          localStore.setData(LocalKeys.USER_DETAILS, userDetails);
          signinResult.errorCode = 0;
          signinResult.errorMessage = "User Signin successfull!";
          resolve(signinResult);
        } else {
          signinResult.errorCode = 1;
          signinResult.errorMessage = "Incorrect email or password!";
          reject(signinResult);
        }
      } catch (err) {
        let signinResult = new SigninResult();
        signinResult.errorCode = 1;
        signinResult.errorMessage = "Something went wrong";
        reject(signinResult);
      }
    });
  }

  searchUser(token: string): Promise<SearchUserResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.USER_ROUTE}/${token}`;
        const restResponse = await this.restCalls.sendHttpRequest(
          Method.GET,
          url
        );
        let searchUserResult = new SearchUserResult();
        if (restResponse) {
          searchUserResult.errorCode = 0;
          searchUserResult.errorMessage = "Successfull!";
          searchUserResult.users = restResponse;
          resolve(searchUserResult);
        } else {
          searchUserResult.errorCode = 1;
          searchUserResult.errorMessage = "Failure!";
          searchUserResult.users = restResponse;
          reject(searchUserResult);
        }
      } catch (err) {
        let searchUserResult = new SearchUserResult();
        searchUserResult.errorCode = 1;
        searchUserResult.errorMessage = "Something went wrong";
        reject(searchUserResult);
      }
    });
  }

  deleteUser(userId: string) {}
}
