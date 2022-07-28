import apiRoutes from "configs/apiRoutes";
import { axios } from "services";
import { useAuth } from "hooks";

export default function useRefreshToken() {
  const auth = useAuth();

  async function refresh() {
    let accessToken = "";

    const response = await axios.get(apiRoutes.APP_REFRESH.url, {
      withCredentials: true,
    });

    const responseinfo = response?.data;
    const responseData = responseinfo?.data;

    if (responseData) {
      auth.setAuth({
        id: responseData.id,
        username: responseData.username,
        email: responseData.email,
        accessToken: responseData.accessToken,
        isLogged: true,
        roles: responseData.roles || [],
      });

      accessToken = responseData.accessToken;
    }

    return accessToken;
  }

  return refresh;
}
