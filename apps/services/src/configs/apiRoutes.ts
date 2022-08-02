type TApiRoutes = {
  [name in string]: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
  };
};

export const apiRoutes: TApiRoutes = {
  APP_AUTH_LOGIN: {
    method: "POST",
    url: "auth/login",
  },
  APP_AUTH_REGISTER: {
    method: "POST",
    url: "auth/register",
  },
  APP_REFRESH_TOKEN: {
    method: "GET",
    url: "auth/refresh",
  },
  APP_LOGOUT: {
    method: "GET",
    url: "auth/logout",
  },
};