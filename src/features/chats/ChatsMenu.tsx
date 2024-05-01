import { Plus } from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import GroupChats from "./GroupChats";
import PrivateChats from "./PrivateChats";

const ChatsMenu = () => {
  return (
    <Tabs defaultValue="private">
      <div className="flex h-16 items-center justify-between px-4 py-2 border-b">
        <h4 className="text-xl font-semibold tracking-tight">Chats</h4>
        <div className="flex items-center gap-2">
          <Button
            className="rounded-full"
            variant="ghost"
            size="icon">
            <Plus className="size-5" />
          </Button>
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
