declare module "@configs" {
  import { Method } from "util/types";

  type TApiRoutes = {
    [name in string]: {
      method: Method;
      url: string;
    };
  };
}
