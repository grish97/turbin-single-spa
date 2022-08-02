
declare module "@configs" {
  type TApiRoutes = {
    [key in `APP_${string}`]: {
      url: string;
      method: "GET" | "POST" | "PUT" | "DELETE" | "OPTION",
    }
  };
}