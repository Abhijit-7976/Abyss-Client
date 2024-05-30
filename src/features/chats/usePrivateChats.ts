import { useToast } from "@/components/ui/use-toast";
import type { Chat, ChatApiData, ChatPage, PageParams } from "@/lib/types";
import { getAllPrivateChats } from "@/services/chatApi";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

export const usePrivateChats = (pageParams: PageParams) => {
  const { search, size } = pageParams;
  const { toast } = useToast();

  const {
    data: privateChatsData,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ChatApiData | undefined,
    Error,
    Chat[],
    QueryKey,
    PageParams
  >({
    queryKey: ["privateChats", search],
    queryFn: params => getAllPrivateChats(params.pageParam),
    initialPageParam: pageParams,
    getNextPageParam: (lastPage?: ChatPage) => {
      const { page, isLast } = lastPage!;
      return isLast ? undefined : { search, page: page + 1, size };
    },
    select(data) {
      if (!data) return [];
      return data.pages.flatMap(page => page?.chats || []);
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
    privateChatsData,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  };
};
