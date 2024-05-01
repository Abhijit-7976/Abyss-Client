import List from "@/components/List";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePrivateChats } from "./usePrivateChats";

const PrivateChats = () => {
  const [privateChatSearch, setPrivateChatSearch] = useState("");
  const [privatePageParams, setPrivatePageParams] = useState({
    search: "",
    page: 1,
    size: 10,
  });
  const [privateChats, setPrivateChats] = useState<Array<Chat>>([]);

  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    usePrivateChats(privatePageParams);

  useEffect(() => {
    if (!isFetching) {
      setPrivateChats(data?.pages.flatMap(page => page.chats) || []);
    }
  }, [data?.pages, isFetching]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPrivatePageParams(prev => ({
        ...prev,
        search: privateChatSearch,
      }));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [privateChatSearch]);

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
            onChange={e => {
              setPrivateChatSearch(e.target.value);
            }}
            placeholder="Search"
            className="pl-8 bg-background/60 hover:bg-background/80 transition-colors"
          />
        </div>
      </div>

      <List
        data={privateChats}
        infiniteScrollRef={ref}
        isFetching={isFetchingNextPage}
      />
    </>
  );
};

export default PrivateChats;
