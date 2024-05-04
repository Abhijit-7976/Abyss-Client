import { useToast } from "@/components/ui/use-toast";
import { PageParams } from "@/lib/types";
import { getAllPrivateChats } from "@/services/chatApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePrivateChats = (pageParams: PageParams) => {
  const { search, size } = pageParams;
  const { toast } = useToast();

  const {
    data: privateChatsData,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["privateChats", search],
    queryFn: params => getAllPrivateChats(params.pageParam),
    initialPageParam: pageParams,
    getNextPageParam: lastPage => {
      const { page, isLast } = lastPage;
      return isLast ? undefined : { search, page: page + 1, size };
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
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  };
};
