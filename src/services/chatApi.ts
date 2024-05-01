import { axiosInstance as axios } from "@/lib/utils";
import { AxiosError } from "axios";

export interface PageParams {
  search: string;
  page: number;
  size: number;
}

export const getAllPrivateChats = async ({
  search,
  page,
  size,
}: PageParams) => {
  try {
    const response = await axios.get("/api/v1/chats/getAllPrivateChats", {
      params: {
        search,
        page,
        limit: size,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to fetch private chats.");
    }
  }
};

export const getAllGroupChats = async ({ search, page, size }: PageParams) => {
  try {
    const response = await axios.get("/api/v1/chats/getAllGroupChats", {
      params: {
        search,
        page,
        limit: size,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to fetch group chats.");
    }
  }
};
