import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PanelRight,
  Phone,
  Plus,
  Search,
  SendHorizontal,
  Video,
} from "lucide-react";
import ChatRoomMessages from "./ChatRoomMessages";

const ChatRoom = () => {
  return (
    <>
      <div className="h-16 flex items-center gap-4 px-4 py-3 border-b">
        <Avatar className="h-10">
          <AvatarImage
            src="https://images.unsplash.com/photo-1713145872144-351db3748385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="You"
          />
          <AvatarFallback className="text-md">CN</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-md font-semibold tracking-tight w-full">
            OIHgdfg
          </h5>
          <p className="text-sm text-muted-foreground overflow-hidden w-full">
            TDdgdfgdgdfgdfgd
          </p>
        </div>
        <div className="ml-auto space-x-2">
          <Button
            variant="ghost"
            size="icon">
            <Video className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon">
            <Phone className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon">
            <PanelRight className="size-5" />
          </Button>
        </div>
      </div>
      <ChatRoomMessages />
      <div className="h-16 flex items-center gap-2 border-t px-4 py-3">
        <Button
          className="rounded-full"
          variant="secondary"
          size="icon">
          <Plus />
        </Button>

        <div className="relative flex-1">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8 bg-background/60 hover:bg-background/80 transition-colors"
          />
        </div>

        <Button
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
