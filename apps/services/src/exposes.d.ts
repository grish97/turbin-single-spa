declare module "@turbo/services" {
  import { BehaviorSubject } from "rxjs";
  import { AxiosInstance } from "axios";

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
  }

  export const useAuth: () => {
    observable$: BehaviorSubject<IUserStore>;
    next: (state: Partial<IUserStore>) => void;
    logout: () => void;
    authState: IUserStore;
  };

  export const useRefreshToken: () => () => string;

  export const useAxiosPrivate: () => AxiosInstance;

  export const usePersistLogin: () => {
    isLoading: boolean;
  };

  export const authSubject$: BehaviorSubject<IUserStore>;
}