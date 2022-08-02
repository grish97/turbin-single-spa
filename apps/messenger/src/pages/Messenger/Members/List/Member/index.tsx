import { FC } from "react";
import ProfileImage from "components/ProfileImage";
import "./style.scss";

const Member: FC = () => {
  return (
    <div className="member">
      <ProfileImage ownerName="Abram" />

      <div className="info">
        <div className="info-row">
          <div className="member-name">Abram Culhance</div>
          <div className="send-date">9:52</div>
        </div>
        <div className="info-row">
          <div className="last-message">I really like this work!</div>
          <div className="message-count">4</div>
        </div>
      </div>
    </div>
  );
};

export default Member;
