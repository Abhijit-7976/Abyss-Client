import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Chat, User } from "@/lib/types";
import { RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { useCreatePrivateChat } from "./useCreatePrivateChat";

interface ConfirmCreatePrivateChatProps {
  friend: User;
  setDialogFriend: React.Dispatch<React.SetStateAction<string>>;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTabValue: React.Dispatch<React.SetStateAction<"private" | "group">>;
}

const ConfirmCreatePrivateChat = ({
  friend,
  setDialogFriend,
  setCreateOpen,
  setTabValue,
}: ConfirmCreatePrivateChatProps) => {
  const { user } = useUser();
  const chatSocket = useSelector((state: RootState) => state.ws.chatSocket);
  const navigate = useNavigate();
  const { createPrivateChat, isPending } = useCreatePrivateChat();

  const [message, setMessage] = useState(`Hello ${friend.username}!`);

  const handleSubmit = () => {
    createPrivateChat(
      { friendId: friend._id, message },
      {
        onSuccess: (data?: Chat) => {
          if (!data) return;

          setDialogFriend("");
          setCreateOpen(false);
          chatSocket.emit("chat:create", {
            userId: user?._id,
            chat: data,
          });
          setTabValue("private");
          navigate(`/chats/${data._id}`);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Start a Private Conversation</DialogTitle>
        <DialogDescription>
          Begin a private chat with the{" "}
          <span className="italic font-bold">{friend.username}</span>. Share
          your first message below, and let's kick off our conversation!
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-1">
        <Label htmlFor="message">Message</Label>
        <Textarea
          onChange={e => setMessage(e.target.value)}
          value={message}
          className="max-h-80 h-10 min-h-10"
          id="message"
          placeholder="Type your message here."
        />
      </div>
      <DialogFooter>
        <Button
          disabled={isPending}
          type="submit"
          onClick={handleSubmit}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin" /> Connecting...
            </>
          ) : (
            "Start Chat"
          )}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ConfirmCreatePrivateChat;
