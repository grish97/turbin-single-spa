
declare module "@auth" {
  interface IAuthSate {
    user: Nullable<User>,
    token: Nullable<string>,
  }
}