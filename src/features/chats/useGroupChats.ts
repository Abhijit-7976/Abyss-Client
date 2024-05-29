import { useToast } from "@/components/ui/use-toast";
import type { Chat, ChatApiData, ChatPage, PageParams } from "@/lib/types";
import { getAllGroupChats } from "@/services/chatApi";
import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";

// FIXME: fix types
export const useGroupChats = (pageParams: PageParams) => {
  const { search, size } = pageParams;
  const { toast } = useToast();

  const {
    data: groupChatsData,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatApiData, Error, Chat[], QueryKey, PageParams>({
    queryKey: ["groupChats", search],
    queryFn: params => getAllGroupChats(params.pageParam),
    initialPageParam: pageParams,
    getNextPageParam: (lastPage: ChatPage) => {
      const { page, isLast } = lastPage;
      return isLast ? undefined : { search, page: page + 1, size };
    },
    select(data) {
      if (!data) return [];
      return data.pages.flatMap(page => page.chats);
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
    groupChatsData,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  };
};
