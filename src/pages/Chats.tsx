import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatsMenu from "@/features/chats/ChatsMenu";
import { Outlet } from "react-router-dom";

const Chats = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={25}
        minSize={15}
        maxSize={40}>
        <ChatsMenu />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col">
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Chats;
