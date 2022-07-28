import { useNavigate } from "react-router-dom";
import apiRoutes from "configs/apiRoutes";
import { axios } from "services";
import { useAuth } from "hooks";

export default function useLogout() {
  const { resetAuth } = useAuth();

  async function logout() {
    try {
      resetAuth();

      localStorage.removeItem("persist");

      await axios.get(apiRoutes.APP_LOGOUT.url, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return logout;
}
