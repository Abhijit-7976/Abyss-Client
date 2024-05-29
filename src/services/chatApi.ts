import {
  Chat,
  ChatApiData,
  ChatMessagesApiData,
  PageParams,
} from "@/lib/types";
import { axiosInstance as axios } from "@/lib/utils";
import { AxiosError } from "axios";

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

    return response.data.data as ChatApiData;
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

    return response.data.data as ChatApiData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to fetch group chats.");
    }
  }
};

export const getChat = async ({ chatId }: { chatId?: string }) => {
  try {
    const response = await axios.get(`/api/v1/chats/${chatId}`);

    return response.data.data.chat as Chat;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to fetch chat details.");
    }
  }
};

export const createPrivateChat = async ({
  friendId,
  message,
}: {
  friendId: string;
  message: string;
}) => {
  try {
    const response = await axios.post("/api/v1/chats/createPrivateChats", {
      friendId,
      message,
    });

    return response.data.data.chat as Chat;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to create private chat.");
    }
  }
};

export const createGroupChat = async ({
  name,
  friendIds,
  message,
}: {
  name: string;
  friendIds: Array<string>;
  message: string;
}) => {
  try {
    const response = await axios.post("/api/v1/chats/createGroupChats", {
      name,
      friendIds,
      message,
    });

    return response.data.data.chat as Chat;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to create private chat.");
    }
  }
};

export const getChatMessages = async ({
  chatId,
  size,
  cursor,
}: {
  chatId: string;
  size?: number;
  cursor?: string;
}) => {
  try {
    const response = await axios.get(`/api/v1/chats/${chatId}/messages`, {
      params: { limit: size, cursor },
    });

    return response.data.data as ChatMessagesApiData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to create private chat.");
    }
  }
};
