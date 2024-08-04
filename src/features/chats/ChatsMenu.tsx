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
import CreateGroupChat from "./CreateGroupChat";
import GroupChats from "./GroupChats";
import PrivateChats from "./PrivateChats";

const ChatsMenu = () => {
  const [createChatOpen, setCreateChatOpen] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [tabValue, setTabValue] = useState<"private" | "group">("private");

  return (
    <Tabs
      value={tabValue}
      onValueChange={value => {
        setTabValue(value as "private" | "group");
      }}>
      <div className="flex h-16 items-center justify-between px-4 py-2 border-b">
        <h4 className="text-xl font-semibold tracking-tight">Chats</h4>
        <div className="flex items-center gap-2">
          <Popover
            open={createChatOpen}
            onOpenChange={setCreateChatOpen}>
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
              className="relative h-[30rem] p-0 flex flex-col gap-1 overflow-hidden"
              sideOffset={8}
              align="start">
              <CreateGroupChat
                open={isNewGroup}
                setOpen={setIsNewGroup}
                setCreateChatOpen={setCreateChatOpen}
                setTabValue={setTabValue}
                className="z-50"
              />
              <CreateChats
                open={createChatOpen}
                setOpen={setCreateChatOpen}
                setOpenGroup={setIsNewGroup}
                setTabValue={setTabValue}
              />
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
