export interface IGroupBody {
  name: string | null;
  picture: string | null;
  members: string[];
  isPrivate: boolean;
  creatorId: string;
}

export interface IGroupModelData {
  name: string | null;
  picture: string | null;
  isPrivate: boolean;
  creatorId: {
    type: string;
    ref: string;
  };
}

export type TConversation = {
  name: string | null;
  picture: string | null;
  message: {
    content: string;
    creatorId: string;
  };
  unreadCount: number;
};
