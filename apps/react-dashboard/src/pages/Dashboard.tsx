import { useAuth } from "@turbo/services";
import "./style.scss";

export const Dashboard = () => {
  const { authState } = useAuth();

  const getUser = () => {
    if (!authState?.user?.id) {
      return "Unauthorized!";
    }

    return (
      <>
        Username: <strong>{authState.user.username}</strong> <br />
        Access Token: <strong>{authState.user.accessToken.substring(0, 15)}...</strong>
      </>
    );
  };

  return (
    <div className="dashboard">
      <h1>This is Dashboard Application Running on port 9003</h1>

      <div>
        <h3>Current credentials is</h3>
        <div>{getUser()}</div>
      </div>
    </div>
  );
};