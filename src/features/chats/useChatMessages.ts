import { useToast } from "@/components/ui/use-toast";
import type {
  ChatMessage,
  ChatMessagesApiData,
  MessagePageParams,
} from "@/lib/types";
import { getChatMessages } from "@/services/chatApi";
import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

// FIXME: fix types
export const useChatMessages = (size?: number) => {
  const chatId = useParams().chatId!;
  const { toast } = useToast();

  const {
    data: chatMessageData,
    error,
    isLoading,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ChatMessagesApiData,
    Error,
    ChatMessage[],
    QueryKey,
    MessagePageParams
  >({
    queryKey: ["messages", chatId],
    queryFn: params => getChatMessages(params.pageParam),
    initialPageParam: { chatId, size },
    getNextPageParam: (lastPage: ChatMessagesApiData) => {
      const { hasNext, lastCursor } = lastPage;
      if (!hasNext) return undefined;
      return { chatId, cursor: lastCursor, size };
    },
    select: data => {
      const length = data.pages.length;
      const messages: Array<ChatMessage> = [];
      for (let i = length - 1; i >= 0; i--) {
        if (data.pages[i].messages.length > 0) {
          messages.push(...data.pages[i].messages);
        }
      }
      return messages;
    },
  });

  if (error) {
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    });
  }

  return {
    chatMessageData,
    isLoading,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  };
};
