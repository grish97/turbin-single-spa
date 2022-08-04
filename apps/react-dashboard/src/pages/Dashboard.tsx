import {useAuth} from "@turbo/services";
import "./style.scss";
import {useCallback} from "react";

export const Dashboard = () => {
  const { authState, observable$ } = useAuth();

  const getUser = useCallback(() => {
    if (!authState?.user?.id) {
      return "Unauthorized!";
    }

    return (
      <>
        Username: <strong>{authState.user.username}</strong> <br />
        Access Token: <strong>{authState.user.accessToken.substring(0, 15)}...</strong>
      </>
    );
  }, [authState]);

  return (
    <div className="dashboard">

      <div className="dashboard-content">
        <h1>Dashboard Application Running on port 9003</h1>

        <div>
          <div>{getUser()}</div>
        </div>
      </div>
    </div>
  );
};
