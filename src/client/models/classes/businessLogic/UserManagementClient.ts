import { environment } from "../../../../environment";
import {
  SearchUserResult,
  SignUpResult,
  SigninResult,
  UpdateUserResult,
} from "../../Entities/RestResults";
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
        const addedUser = await this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          user
        );
        let signupResult = new SignUpResult();
        if (addedUser._id) {
          signupResult.errorCode = 0;
          signupResult.errorMessage = "Signup successfull!";
          signupResult.user = addedUser;
          resolve(signupResult);
        } else {
          signupResult.errorCode = 1;
          signupResult.errorMessage = addedUser.message;
          signupResult.user = user;
          resolve(addedUser);
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
          this.storeSigninDetails(accessToken, userDetails);
          signinResult.errorCode = 0;
          signinResult.errorMessage = "User Signin successfull!";
          resolve(signinResult);
        } else {
          signinResult.errorCode = 1;
          signinResult.errorMessage = "Incorrect email or password!";
          resolve(signinResult);
        }
      } catch (err) {
        let signinResult = new SigninResult();
        signinResult.errorCode = 1;
        signinResult.errorMessage = "Something went wrong";
        reject(signinResult);
      }
    });
  }

  private storeSigninDetails(accessToken: string, userDetails: User) {
    const localStore = new LocalStorage();
    localStore.setData(LocalKeys.ACCESS_TOKEN, accessToken);
    localStore.setData(LocalKeys.USER_DETAILS, userDetails);
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

  updateUser(user: User): Promise<UpdateUserResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.USER_ROUTE}/${user._id}`;
        const restResponse = await this.restCalls.sendHttpRequest(
          Method.PUT,
          url,
          user
        );
        let updateUserResult = new UpdateUserResult();
        if (restResponse) {
          updateUserResult.errorCode = 0;
          updateUserResult.errorMessage = "Successfull!";
          updateUserResult.user = restResponse;
          resolve(updateUserResult);
        } else {
          updateUserResult.errorCode = 1;
          updateUserResult.errorMessage = "Failure!";
          updateUserResult.user = restResponse;
          reject(updateUserResult);
        }
      } catch (err) {
        let searchUserResult = new UpdateUserResult();
        searchUserResult.errorCode = 1;
        searchUserResult.errorMessage = "Something went wrong";
        reject(searchUserResult);
      }
    });
  }

  deleteUser(userId: string) {}
}
