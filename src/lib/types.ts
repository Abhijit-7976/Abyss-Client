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
  createdAt: string;
  updatedAt: string;
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
  page: number;
  size: number;
}

export interface Chat {
  _id: string;
  name: string;
  type: "private" | "group";
  lastMessage?: string;
  image: string;
  ping?: boolean;
  createdAt: string;
  updatedAt: string;
}
