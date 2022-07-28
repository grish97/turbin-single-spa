import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth, useRefreshToken } from "hooks";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
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

    !auth.isLogged && auth.persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      console.log("Unmount");
    };
  }, []);

  return !auth.persist ? (
    <Outlet />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <Outlet />
  );
}
