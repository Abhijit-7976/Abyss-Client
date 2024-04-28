import Duration from "@/components/Duration";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, Users } from "lucide-react";

import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import CallRoomStreams from "./CallRoomStreams";

const CallRoom = () => {
  return (
    <>
      <div className="h-16 flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Users className="size-10" />
          <p className="text-md text-foreground overflow-hidden w-full">6</p>
        </div>
        <Duration />
        <Button
          variant="ghost"
          size="icon">
          <UserRoundPlus className="size-5" />
        </Button>
      </div>
      <CallRoomStreams />
      <div className="h-16 border-t"></div>
    </>
  );
};

export default CallRoom;
