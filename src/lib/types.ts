export type ApiData<T = null> = {
  data: T;
  isOperational?: boolean;
  statusCode: number;
  message: string;
  status: "success" | "fail" | "error";
};

export type User = {
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
};

export type AuthData = {
  user: User;
  token: string;
};
