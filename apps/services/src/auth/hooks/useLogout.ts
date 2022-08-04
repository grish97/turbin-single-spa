import { axiosPublic } from "utils";
import { useAuth } from "auth/hooks";
import { apiRoutes } from "configs/apiRoutes";
import { LocalStorage } from "../../constants";

export const useLogout = () => {
  const { logout: logoutUser } = useAuth();

  async function logout() {
    try {
      logoutUser();

      localStorage.removeItem(LocalStorage.PERSIST);

      await axiosPublic.get(apiRoutes.APP_LOGOUT.url, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { logout };
}