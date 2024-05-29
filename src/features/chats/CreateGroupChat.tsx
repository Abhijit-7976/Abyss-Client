import Item from "@/components/Item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowLeft, CircleX, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import ConfirmCreateGroupChat from "./ConfirmCreateGroupChat";
import { clearUsers, removeUser, toggleUser } from "./selectedGroupUsersSlice";
import { useUsers } from "./useUsers";

interface CreateGroupChatProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTabValue: React.Dispatch<React.SetStateAction<"private" | "group">>;
}

const CreateGroupChat = ({
  open,
  setOpen,
  setCreateChatOpen,
  setTabValue,
  className,
}: CreateGroupChatProps) => {
  const selectedUsers = useSelector(
    (state: RootState) => state.selectedGroupUsers
  );
  const dispatch = useDispatch<AppDispatch>();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersParams, setUsersParams] = useState({
    search: "",
    page: 1,
    size: 15,
  });
  const { ref, inView } = useInView();

  const { usersData, fetchNextPage, isLoading, isFetchingNextPage } =
    useUsers(usersParams);

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

  const handleSelect = (user: User) => {
    dispatch(toggleUser(user));
  };

  return (
    <div
      className={cn(
        "absolute pt-1 flex flex-col gap-2 rounded-md translate-x-full transition-all invisible size-[calc(100%-2px)] bg-background",
        open && "translate-x-0 visible",
        className
      )}>
      <div className="flex items-center pl-2 pr-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setOpen(false)}>
          <ArrowLeft className="size-5" />
        </Button>
        <h3 className="text-lg font-semibold">New Group</h3>
      </div>

      <div className="px-4 ">
        <Input
          onChange={e => setUsersSearch(e.target.value)}
          placeholder="Search"
        />
      </div>

      {selectedUsers.length > 0 && (
        <>
          <ScrollArea className="mx-4 p-1 max-h-20 rounded-md border">
            {selectedUsers.map(user => (
              <Badge
                key={user._id}
                className="m-1 hover:bg-primary">
                {user.username}
                <CircleX
                  className="size-4 cursor-pointer -mr-2 ml-1 hover:bg-white/20 rounded-full"
                  onClick={() => {
                    console.log({ user });
                    dispatch(removeUser(user._id));
                  }}
                />
              </Badge>
            ))}
          </ScrollArea>

          <div className="px-4 flex gap-2">
            <Dialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="flex-1 h-8">
                  Next
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ConfirmCreateGroupChat
                  friends={selectedUsers}
                  setCreateGroupOpen={setOpen}
                  setConfirmOpen={setConfirmOpen}
                  setCreateOpen={setCreateChatOpen}
                  setTabValue={setTabValue}
                />
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8"
              onClick={() => dispatch(clearUsers())}>
              Cancel
            </Button>
          </div>
        </>
      )}

      <ScrollArea className="flex-1 mb-3">
        {isLoading ? (
          <div className="px-4 space-y-2">
            <Label>All users</Label>
            <Loader2 className="mt-2 mx-auto animate-spin text-muted-foreground mb-3" />
          </div>
        ) : (
          <>
            <div className="px-4 space-y-2 pb-1">
              <Label>All users</Label>
              {usersData?.map(user => (
                <Item
                  key={user._id}
                  onClick={() => handleSelect(user)}
                  name={user.username}
                  image={user.avatar}
                  size="sm"
                />
              ))}
            </div>
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full py-2">
                <Loader2 className="size-6 animate-spin" />
              </div>
            )}
            <div ref={ref} />
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default CreateGroupChat;
