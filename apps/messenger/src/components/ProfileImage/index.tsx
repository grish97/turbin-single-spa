import { FC } from "react";
import "./style.scss";

interface IPropType {
  imageSrc?: string;
  ownerName: string;
  size?: number;
  showStatus?: boolean;
}

const ProfileImage: FC<IPropType> = ({ imageSrc, ownerName, size, showStatus }) => {
  return (
    <div
      className="profile-icon"
      style={{
        width: size,
        height: size,
      }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={`${ownerName}'s profile image`} />
      ) : (
        <div className="first-latter">{ownerName.charAt(0)}</div>
      )}

      {showStatus && <div className="status active"></div>}
    </div>
  );
};

ProfileImage.defaultProps = {
  size: 40,
  showStatus: true,
};

export default ProfileImage;
