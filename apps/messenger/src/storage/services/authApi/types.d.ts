declare module "@auth-api" {
  interface IUser {
    firstname: string;
    lastname: string;
    age: number;
    profession: string;
  }

  interface IUserResponse {
    user: IUser;
    token: string;
  }

  interface ILoginRequest {
    username: string;
    password: string;
  }

  interface IRegisterRequest {
    firstname: string;
    lastname: string;
    age: number;
    profession: string;
  }
}