export interface ApiData<T = null> {
  data: T;
  isOperational?: boolean;
  statusCode: number;
  message: string;
  status: "success" | "fail" | "error";
}

export interface User {
  _id: string;
  username: string;
  avatar?: string;
  coverImage?: string;
  email: string;
  password: string;
  dob: string;
  role: string;
  friends: string[];
  privateChats: string[];
  groupChats: string[];
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt?: string;
  passwordResetToken?: string;
  resetTokenExpires?: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface PageParams {
  search: string;
  page?: number;
  size?: number;
}

export interface ChatPage {
  page: number;
  isLast: boolean;
  chats: Chat[];
}

export interface UsersPage {
  page: number;
  isLast: boolean;
  users: User[];
}

export interface Chat {
  _id: string;
  name: string;
  type: "private" | "group";
  lastMessage?: string;
  image: string;
  ping?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessagePageParams {
  chatId: string;
  cursor?: string;
  size?: number;
}

export interface ChatApiData {
  page: number;
  isLast: boolean;
  chats: Chat[];
}

export interface Sender {
  _id: string;
  username: string;
  avatar?: string;
  email: string;
}

export interface ChatMessage {
  _id: string;
  sender: Sender;
  text?: string;
  createdAt: Date;
  // updatedAt: Date;
  attachments?: string[];
}

export interface ChatMessagesApiData {
  messages: ChatMessage[];
  hasNext: boolean;
  lastCursor?: string;
}
