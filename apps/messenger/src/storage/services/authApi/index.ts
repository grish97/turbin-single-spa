import { api as authApi } from "./api";

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutQuery,
  useRefreshTokenMutation,
} = authApi;

export default authApi;
