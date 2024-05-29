import Item from "@/components/Item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";

import { Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ConfirmCreatePrivateChat from "./ConfirmCreatePrivateChat";
import { useUnknownUsers } from "./useUnknownUsers";

interface CreateChatsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenGroup: React.Dispatch<React.SetStateAction<boolean>>;
  setTabValue: React.Dispatch<React.SetStateAction<"private" | "group">>;
}

const CreateChats = ({
  open,
  setOpen,
  setOpenGroup,
  setTabValue,
}: CreateChatsProps) => {
  const queryClient = useQueryClient();
  const [dialogFriend, setDialogFriend] = useState("");
  const [usersSearch, setUsersSearch] = useState("");
  const [usersParams, setUsersParams] = useState({
    search: "",
    page: 1,
    size: 15,
  });

  const { ref, inView } = useInView();

  const { usersData, fetchNextPage, isLoading, isFetchingNextPage } =
    useUnknownUsers(usersParams);

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
      <div className="px-4 pt-2 space-y-2">
        <h3 className="text-lg font-semibold">New Chat</h3>
        <Input
          onChange={e => setUsersSearch(e.target.value)}
          placeholder="Search"
        />
      </div>

      <ScrollArea className="flex-1 mb-3">
        <div className="px-4 py-1">
          <Button
            variant="outline"
            className="w-full grid grid-cols-[3rem_minmax(0,_1fr)_max-content]  h-fit px-2.5 py-1 gap-x-1"
            onClick={() => setOpenGroup(true)}>
            <Avatar className="size-10 ring-2 ring-background">
              <AvatarFallback>
                <Users className="size-4" />
              </AvatarFallback>
            </Avatar>
            <h5 className="text-md font-semibold tracking-tight w-full text-left">
              New group
            </h5>
          </Button>
        </div>

        {isLoading ? (
          <div className="px-4 space-y-2">
            <Label>All users</Label>
            <Loader2 className="mt-2 mx-auto animate-spin text-muted-foreground mb-3" />
          </div>
        ) : (
          <>
            <div className="px-4 space-y-2">
              <Label>All users</Label>
              {usersData?.map(user => (
                <Dialog
                  key={user._id}
                  open={dialogFriend === user._id}
                  onOpenChange={open => {
                    open ? setDialogFriend(user._id) : setDialogFriend("");
                  }}>
                  <DialogTrigger asChild>
                    <Item
                      name={user.username}
                      image={user.avatar}
                      size="sm"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <ConfirmCreatePrivateChat
                      friend={user}
                      setDialogFriend={setDialogFriend}
                      setCreateOpen={setOpen}
                      setTabValue={setTabValue}
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
            {isFetchingNextPage && (
              <Loader2 className=" mx-auto animate-spin text-muted-foreground" />
            )}
            <div ref={ref} />
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default CreateChats;
