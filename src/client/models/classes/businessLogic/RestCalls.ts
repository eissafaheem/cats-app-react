import { LocalKeys, LocalStorage } from "./LocalStorage";

export enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

export class RestCalls {
  sendHttpRequest(
    method: Method,
    url: string,
    body?: any,
    accessToken: string | null = null
  ): any {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = "json";  
      if (accessToken) {
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
      }
      if (body) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else if (xhr.status === 404) {
          resolve(xhr.response);
        } else if (xhr.status === 401) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };
      xhr.onerror = (err) => {
        console.error(err);
        reject(err);
      };
      xhr.send(JSON.stringify(body));
    });
  }
}
