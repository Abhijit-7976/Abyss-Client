import { useToast } from "@/components/ui/use-toast";
import { PageParams } from "@/lib/types";
import { getAllUnknownUsers } from "@/services/userApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUnknownUsers = (pageParams: PageParams) => {
  const { search, size } = pageParams;
  const { toast } = useToast();

  const {
    data: usersData,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", search],
    queryFn: params => getAllUnknownUsers(params.pageParam),
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
    usersData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};
