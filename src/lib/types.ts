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

export interface Chat {
  _id: string;
  name: string;
  type: "private" | "group";
  description?: string;
  time?: string;
  image: string;
  ping?: boolean;
}
