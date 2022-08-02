import { FC } from "react";
import {IoSearch} from "react-icons/io5";
import {BiDotsHorizontalRounded} from "react-icons/bi";
import { ProfileImage } from "components";
import "./style.scss";

interface IPropType {
  className: string;
}

const ICON_COLOR = "#8a8488";

const GroupInfo: FC<IPropType> = ({ className }) => {
  return (
    <div className={className}>
      <div className='left-area'>
        <ProfileImage ownerName="John" showStatus={false} />

        <div className="about-info">
          <div className="group-name">Design Team</div>
          <div className="any-statuses">8 members, 5 online</div>
        </div>
      </div>


      <div className="actions">
        <IoSearch color={ICON_COLOR} size={25} className="search-icon" />
        <BiDotsHorizontalRounded color={ICON_COLOR} size={25} />
      </div>
    </div>
  );
};

export default GroupInfo;