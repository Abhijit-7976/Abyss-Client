import axios, { AxiosError } from "axios";

export type LoginParams = { email: string; password: string };

export type SignupParams = {
  username: string;
  dob: Date;
  email: string;
  password: string;
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/v1/auth/me");

    return response.data.data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Please login to continue.");
    }
  }
};

export const login = async ({ email, password }: LoginParams) => {
  try {
    const response = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to login. Please try again later.");
    }
  }
};

export const signup = async ({
  username,
  dob,
  email,
  password,
}: SignupParams) => {
  try {
    const response = await axios.post("/api/v1/auth/signup", {
      username,
      dob,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to signup. Please try again later.");
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.get("/api/v1/auth/logout");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to logout. Please try again later.");
    }
  }
};
