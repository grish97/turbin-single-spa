import { FC } from "react";
import ProfileImage from "components/ProfileImage";
import "./style.scss";

const Header: FC = () => {
  return (
    <div className="m-header">
      <ProfileImage ownerName="John" />

      <div className="about">
        <div className="name">John</div>
        <div className="profession">Software Engineer</div>
      </div>

      <div className="actions">...</div>
    </div>
  );
};

export default Header;
