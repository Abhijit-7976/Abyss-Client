import List from "@/components/List";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGroupChats } from "./useGroupChats";

const GroupChats = () => {
  const [groupChatSearch, setGroupChatSearch] = useState("");
  const [groupPageParams, setGroupPageParams] = useState({
    search: "",
    page: 1,
    size: 10,
  });

  const { ref, inView } = useInView();

  const { groupChatsData, fetchNextPage, isPending, isFetchingNextPage } =
    useGroupChats(groupPageParams);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGroupPageParams(prev => ({
        ...prev,
        search: groupChatSearch,
      }));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [groupChatSearch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={e => setGroupChatSearch(e.target.value)}
            value={groupChatSearch}
            placeholder="Search"
            className="pl-8 bg-background/60 hover:bg-background/80 transition-colors"
          />
        </div>
      </div>

      {isPending ? (
        <Loader2 className="mx-auto animate-spin text-muted-foreground" />
      ) : (
        <List
          data={groupChatsData}
          infiniteScrollRef={ref}
          isFetching={isFetchingNextPage}
        />
      )}
    </>
  );
};

export default GroupChats;
