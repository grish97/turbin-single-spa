import { FC } from "react";
import TypingBox from './TypingBox';
import Conversation from './Conversation';
import GroupInfo from "./GroupInfo";
import "./style.scss";

const ChatContent: FC = () => {
  return (
    <div className="chat-content">
      <GroupInfo className="group-info" />

      <Conversation className="conversation" />

      <TypingBox className="typing-box" />
    </div>
  );
};

export default ChatContent;