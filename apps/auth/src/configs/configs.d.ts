declare module "@configs" {

  type TApiRoutes = {
    [name in string]: {
      method: "GET" | "POST" | "PUT" | "DELETE";
      url: string;
    };
  };
}
