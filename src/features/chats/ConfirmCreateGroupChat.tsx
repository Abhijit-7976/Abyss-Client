import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Chat, User } from "@/lib/types";
import { AppDispatch, RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { clearUsers } from "./selectedGroupUsersSlice";
import { useCreateGroupChat } from "./useCreateGroupChat";

interface ConfirmCreateGroupChatProps {
  friends: User[];
  setCreateGroupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTabValue: React.Dispatch<React.SetStateAction<"private" | "group">>;
}

const ConfirmCreateGroupChat = ({
  friends,
  setCreateGroupOpen,
  setConfirmOpen,
  setCreateOpen,
  setTabValue,
}: ConfirmCreateGroupChatProps) => {
  const { user } = useUser();
  const chatSocket = useSelector((state: RootState) => state.ws.chatSocket);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { createGroupChat, isPending } = useCreateGroupChat();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("Hello everyone!");
  const friendIds = friends.map(friend => friend._id);

  let friendNames = `${friends[0].username}`;
  if (friends.length === 2) {
    friendNames += `and ${friends[1].username}`;
  } else if (friends.length === 3) {
    friendNames += `and ${friends[2]?.username}`;
  } else if (friends.length > 3) {
    friendNames += `and ${friends.length - 2} others`;
  }

  const handleSubmit = () => {
    createGroupChat(
      { name, friendIds, message },
      {
        onSuccess: (data?: Chat) => {
          if (!data) return;

          setCreateGroupOpen(false);
          setCreateOpen(false);
          setConfirmOpen(false);
          chatSocket.emit("chat:create", {
            userId: user?._id,
            chat: data,
          });
          setTabValue("group");
          navigate(`/chats/${data._id}`);
          dispatch(clearUsers());
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Start a Private Conversation</DialogTitle>
        <DialogDescription>
          Create a group chat with{" "}
          <span className="italic font-bold">{friendNames}</span>. Share your
          first message below, and let's kick off our conversation!
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-1">
        <Label htmlFor="name">Group Name</Label>
        <Input
          id="name"
          value={name}
          placeholder="Type your group name here."
          onChange={e => setName(e.target.value)}
        />
      </div>
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

export default ConfirmCreateGroupChat;
