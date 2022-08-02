import { useAuth } from "auth/hooks";
import { axiosPublic } from "utils";
import { apiRoutes } from "configs/apiRoutes";

export const useRefreshToken = () => {
  const { next } = useAuth();

  async function refresh() {
    let accessToken = "";

    const response = await axiosPublic.get(apiRoutes.APP_REFRESH_TOKEN.url, {
      withCredentials: true,
    });

    const responseInfo = response?.data;
    const responseData = responseInfo?.data;

    if (responseData) {
      next({
        user: {
          id: responseData.id,
          username: responseData.username,
          email: responseData.email,
          accessToken: responseData.accessToken,
          isLogged: true,
          roles: responseData.roles || [],
        },
      });

      accessToken = responseData.accessToken;
    }

    return accessToken;
  }

  return refresh;
};