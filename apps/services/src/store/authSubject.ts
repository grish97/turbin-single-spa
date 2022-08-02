import { BehaviorSubject } from "rxjs";

export interface IUser {
  id: string;
  username: string;
  accessToken: string;
  email: string;
  isLogged: boolean;
  roles: string[];
}

export interface IUserStore {
  user: IUser | null;
  persist: boolean,
}

export const initialState: IUserStore = {
  user: null,
  persist: localStorage.getItem("persist") === "true" || false
};

export const authSubject$ = new BehaviorSubject<IUserStore>(initialState);