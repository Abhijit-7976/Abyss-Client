import { useUser } from "@/features/authentication/useUser";
import { type RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { type Socket } from "socket.io-client";
import NavBar from "./NavBar";

const AppLayout = () => {
  const chatSocket = useSelector<RootState, Socket>(
    state => state.ws.chatSocket
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, navigate, user]);

  useEffect(() => {
    if (!isLoading && user) {
      chatSocket.emit("user_connected", { userId: user!._id });
    }
    chatSocket.on("chat:new", chat => {
      console.log(chat);

      switch (chat.type) {
        case "private":
          console.log("private chat");
          queryClient.invalidateQueries({ queryKey: ["privateChats"] });
          break;

        case "group":
          console.log("group chat");
          queryClient.invalidateQueries({ queryKey: ["groupChats"] });
          break;
      }
    });

    return () => {
      chatSocket.off("chat:new");
    };
  }, [chatSocket, isLoading, queryClient, user]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
