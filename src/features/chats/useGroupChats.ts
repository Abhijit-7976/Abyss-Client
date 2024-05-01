import { useToast } from "@/components/ui/use-toast";
import { PageParams, getAllGroupChats } from "@/services/chatApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGroupChats = (pageParams: PageParams) => {
  const { search, size } = pageParams;
  const { toast } = useToast();

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["groupChats", search],
    queryFn: params => getAllGroupChats(params.pageParam),
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
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  };
};
