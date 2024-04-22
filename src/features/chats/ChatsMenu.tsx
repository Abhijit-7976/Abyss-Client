import { Plus } from "lucide-react";
import List from "../../components/List";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const ChatsMenu = () => {
  const chats = Array.from({ length: 20 }).map((_, i) => {
    return {
      avatar:
        i % 2 === 0
          ? "https://images.unsplash.com/photo-1713145872144-351db3748385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : undefined,
      username: "Shinigami",
      time: i % 2 === 0 ? new Date() : undefined,
      ping: i % 3 === 0 ? true : false,
      description: i % 2 === 0 ? "Hello there! How are you?" : undefined,
    };
  });

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
        className="mt-0">
        <List data={chats} />
      </TabsContent>
      <TabsContent
        value="group"
        className="mt-0">
        <List data={chats} />
      </TabsContent>
    </Tabs>
  );
};

export default ChatsMenu;
