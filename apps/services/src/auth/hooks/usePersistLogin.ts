import {useCallback, useEffect, useState} from "react";
import {useAuth, useRefreshToken} from "auth/hooks";

export const usePersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {authState} = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    isVerify()
      ? verifyRefreshToken()
      : setIsLoading(false);
  }, []);

  const isVerify = () => !authState.user?.isLogged && authState.persist;

  return {
    isLoading,
    isVerify
  };
};