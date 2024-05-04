import Item from "@/components/Item";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUnknownUsers } from "./useUnknownUsers";

interface CreateChatsProps {
  open: boolean;
}

const CreateChats = ({ open }: CreateChatsProps) => {
  const queryClient = useQueryClient();
  const [usersSearch, setUsersSearch] = useState("");
  const [usersParams, setUsersParams] = useState({
    search: "",
    page: 1,
    size: 15,
  });
  const [users, setUsers] = useState<Array<User>>([]);

  const { ref, inView } = useInView();

  const { usersData, fetchNextPage, isLoading, isFetchingNextPage } =
    useUnknownUsers(usersParams);

  useEffect(() => {
    if (!isLoading) {
      setUsers(usersData?.pages.flatMap(page => page.users) || []);
    }
  }, [usersData?.pages, isLoading]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUsersParams(prev => ({
        ...prev,
        search: usersSearch,
      }));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [usersSearch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (!open) {
      queryClient.invalidateQueries({ queryKey: ["users", usersSearch] });
    }
  }, [open, queryClient, usersSearch]);

  return (
    <>
      <div className="px-3 pt-3 mb-2 space-y-2">
        <h3 className="text-lg font-semibold">New Chat</h3>
        <Input
          onChange={e => setUsersSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      <ScrollArea className="h-[21.75rem] mb-3">
        <div className="px-3 py-1 space-y-2">
          {users.map(user => (
            <Item
              key={user._id}
              name={user.username}
              image={user?.avatar}
              size="sm"
            />
          ))}
        </div>
        <div ref={ref}>
          {isFetchingNextPage && (
            <Loader2 className=" mx-auto animate-spin text-muted-foreground" />
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default CreateChats;
