import { Plus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import CreateChats from "./CreateChats";
import GroupChats from "./GroupChats";
import PrivateChats from "./PrivateChats";

const ChatsMenu = () => {
  const [createChatOpen, setCreateChatOpen] = useState(false);

  return (
    <Tabs defaultValue="private">
      <div className="flex h-16 items-center justify-between px-4 py-2 border-b">
        <h4 className="text-xl font-semibold tracking-tight">Chats</h4>
        <div className="flex items-center gap-2">
          <Popover
            onOpenChange={open => {
              setCreateChatOpen(open);
            }}>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "rounded-full text-muted-foreground",
                  createChatOpen && "bg-muted text-foreground"
                )}
                variant="ghost"
                size="icon">
                <Plus className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              sideOffset={8}
              align="start">
              <CreateChats open={createChatOpen} />
            </PopoverContent>
          </Popover>
          <TabsList>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="group">Group</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent
        value="private"
        className="mt-0 h-[calc(100vh-4rem)]">
        <PrivateChats />
      </TabsContent>
      <TabsContent
        value="group"
        className="mt-0 h-[calc(100vh-4rem)]">
        <GroupChats />
      </TabsContent>
    </Tabs>
  );
};

export default ChatsMenu;
