import { FC } from 'react';
import './style.scss';

interface IPropType {
  className: string;
}

const Conversation: FC<IPropType> = ({className}) => {
  return (
    <div className={className}>No any conversations yet!</div>
  );
};

export default Conversation;