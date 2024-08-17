import Duration from "@/components/Duration";
import { Button } from "@/components/ui/button";
import {
  Mic,
  PhoneCall,
  PhoneOff,
  ScreenShare,
  UserRoundPlus,
  Users,
  Video,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import CallRoomStreams from "./CallRoomStreams";
import { Badge } from "@/components/ui/badge";

const CallRoom = () => {
  return (
    <>
      {/* <div className="h-16 flex items-center justify-between px-4 py-3 border-b">
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
      </div> */}

      <div className="flex justify-center p-4">
        <Duration />
      </div>

      <CallRoomStreams />

      <div className="flex p-4 justify-between items-center gap-2">
        <p>SOJIDGFOIP30I-09FUJ1U</p>

        <div className="flex justify-center items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full">
            <Mic className="size-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full">
            <Video className="size-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full">
            <ScreenShare className="size-5" />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="rounded-full">
            <PhoneOff className="size-5" />
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full relative">
          <Users className="size-5" />
          <Badge
            variant="default"
            className="absolute -top-2.5 px-1.5 py-0">
            4
          </Badge>
        </Button>
      </div>
    </>
  );
};

export default CallRoom;
