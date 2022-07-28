declare module "@store" {
  type TAuthState = {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    isLogged: boolean;
    persist: boolean;
    roles: number[];
  };
}
