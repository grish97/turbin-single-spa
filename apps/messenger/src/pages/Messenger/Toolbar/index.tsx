import { FC, useCallback, useMemo, useState } from "react";
import { FaUsers, FaPhoneAlt, FaComments } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { TbBrightnessHalf } from "react-icons/tb";
import "./style.scss";

const ICON_SIZE = 30;
const ICON_COLOR = "#8a8488";
const ICON_ACTIVE_COLOR = "#ffffff";

const Toolbar: FC = () => {
  const [activeTab, setActiveTab] = useState("conversations");

  const activeIconColor = useCallback(
    (tab: string) => {
      return activeTab === tab ? ICON_ACTIVE_COLOR : ICON_COLOR;
    },
    [activeTab]
  );

  return (
    <div className="toolbar">
      <div className="header">M.</div>

      <div className="tabs">
        <FaUsers
          size={ICON_SIZE}
          color={activeIconColor("friends")}
          onClick={() => setActiveTab("friends")}
        />
        <FaPhoneAlt
          size={ICON_SIZE}
          color={activeIconColor("calls")}
          onClick={() => setActiveTab("calls")}
        />
        <FaComments
          size={ICON_SIZE}
          color={activeIconColor("conversations")}
          onClick={() => setActiveTab("conversations")}
        />
        <FiSettings
          size={ICON_SIZE}
          color={activeIconColor("settings")}
          onClick={() => setActiveTab("settings")}
        />
      </div>

      <div className="brightness">
        <TbBrightnessHalf
          size={ICON_SIZE}
          color={activeIconColor("brightness")}
          onClick={() => setActiveTab("brightness")}
        />
      </div>
    </div>
  );
};

export default Toolbar;
