import { TApiRoutes } from "@configs";

export const apiRoutes: TApiRoutes = {
  APP_GET_GROUPS: {
    url: "/group",
    method: "GET",
  },
  APP_GET_CONVERSATIONS: {
    url: "/group/conversations",
    method: "GET",
  },
  APP_GET_MESSAGES: {
    url: "/message",
    method: "GET",
  }
};