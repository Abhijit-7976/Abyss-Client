import { useUser } from "@/features/authentication/useUser";
import { type RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { type Socket } from "socket.io-client";
import NavBar from "./NavBar";

const AppLayout = () => {
  const chatSocket = useSelector<RootState, Socket>(
    state => state.ws.chatSocket
  );

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      chatSocket.emit("user_connected", { userId: user!._id });
    }
  }, [chatSocket, isLoading, user]);

  return (
    <div className="flex min-h-screen w-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
