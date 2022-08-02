import {sourceApi} from "storage/services/sourceApi";
import {IUserResponse, ILoginRequest, IRegisterRequest} from "@auth-api";

export const api = sourceApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      })
    }),
    signUp: builder.mutation<IUserResponse, IRegisterRequest>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      })
    }),
    signOut: builder.query<void, void>({
      query: () => `logout`,
    }),
    refreshToken: builder.mutation<void, { accessToken: string }>({
      query: () => "refresh-token",
    }),
  }),
});