import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authSubject$ } from "@turbo/services";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DOMAIN,
    prepareHeaders: (headers, { getState }) => {
      const token = authSubject$.getValue().user.accessToken;

      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Group", "Task"],
  endpoints: () => ({}),
});
