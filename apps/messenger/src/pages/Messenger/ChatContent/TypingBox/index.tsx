import { FC, useState } from "react";
import { FaLink } from "react-icons/fa";
import { MdKeyboardVoice, MdOutlineEmojiEmotions } from "react-icons/md";
import { Input } from "components";
import "./style.scss";

interface IPropType {
  className: string;
}

const ICON_COLOR = "#8a8488";

const TypingBox: FC<IPropType> = ({ className }) => {
  const [value, setValue] = useState("");

  const selectFiles = () => {};

  return (
    <div className={className}>
      <FaLink color={ICON_COLOR} onClick={selectFiles} size={25} />

      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        size="large"
        placeholder="Write a message..."
        noBorder={true}
        suffix={<MdOutlineEmojiEmotions color={ICON_COLOR} size={25} />}
      />

      <MdKeyboardVoice color={ICON_COLOR} onClick={selectFiles} size={25} />
    </div>
  );
};

export default TypingBox;
