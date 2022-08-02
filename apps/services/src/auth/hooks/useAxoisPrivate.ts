import { useEffect } from "react";
import { axiosPrivate } from "utils/axiosHttp";
import { useAuth, useRefreshToken } from "auth/hooks";

/**
 * Hook for add interceptors for axios private request
 * @returns axios private instance
 */
export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { authState } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (configs) => {
        if (configs?.headers && !configs.headers["Authorization"]) {
          configs.headers["Authorization"] = `Bearer ${authState.user?.accessToken}`;
        }

        return configs;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.configs;

        if (
          [403, 401].includes(error?.response?.status) &&
          prevRequest &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;

          prevRequest.headers["Authorization"] = await refresh();

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authState, refresh]);

  return axiosPrivate;
}
