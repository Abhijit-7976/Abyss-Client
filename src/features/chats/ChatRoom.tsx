import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PanelRight,
  Phone,
  Plus,
  Search,
  SendHorizontal,
  Video,
} from "lucide-react";
import ChatRoomMessages from "./ChatRoomMessages";
import { usePrivateChat } from "./useChat";

const ChatRoom = () => {
  const { privateChat, isLoading } = usePrivateChat();

  console.log({ privateChat, isLoading });

  return (
    <>
      <div className="h-16 flex items-center gap-3 px-4 py-3 border-b">
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <Avatar className="h-10">
            <AvatarImage
              src={privateChat.image}
              alt={privateChat.name}
            />
            <AvatarFallback className="text-md">
              {privateChat.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-3.5 w-36" />
          </div>
        ) : (
          <div>
            <h5 className="text-md font-semibold tracking-tight w-full">
              {privateChat.name}
            </h5>

            <p className="text-sm text-muted-foreground overflow-hidden w-full">
              Online
            </p>
          </div>
        )}
        <div className="ml-auto space-x-2">
          <Button
            disabled={isLoading}
            variant="ghost"
            size="icon">
            <Video className="size-5" />
          </Button>
          <Button
            disabled={isLoading}
            variant="ghost"
            size="icon">
            <Phone className="size-5" />
          </Button>
          <Button
            disabled={isLoading}
            variant="ghost"
            size="icon">
            <PanelRight className="size-5" />
          </Button>
        </div>
      </div>
      <ChatRoomMessages />
      <div className="h-16 flex items-center gap-2 border-t px-4 py-3">
        <Button
          disabled={isLoading}
          className="rounded-full"
          variant="secondary"
          size="icon">
          <Plus />
        </Button>

        <div className="relative flex-1">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            disabled={isLoading}
            placeholder="Search"
            className="pl-8 bg-background/60 hover:bg-background/80 transition-colors"
          />
        </div>

        <Button
          disabled={isLoading}
          className="rounded-full"
          variant="default"
          size="icon">
          <SendHorizontal />
        </Button>
      </div>
    </>
  );
};

export default ChatRoom;
