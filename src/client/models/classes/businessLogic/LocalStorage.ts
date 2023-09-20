export class LocalStorage{
    getData(data: string){
        return JSON.parse(localStorage.getItem(data) || "");
    }

    setData(key:string, value:any){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export enum LocalKeys {
    ACCESS_TOKEN= "accessToken",
    USER_DETAILS = "userDetails"
}