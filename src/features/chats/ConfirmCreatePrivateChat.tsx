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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePrivateChat } from "./useCreateChat";

interface ConfirmCreatePrivateChatProps {
  user: User;
  setDialogFriend: React.Dispatch<React.SetStateAction<string>>;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmCreatePrivateChat = ({
  user,
  setDialogFriend,
  setCreateOpen,
}: ConfirmCreatePrivateChatProps) => {
  console.log("confirm create private chat");
  const navigate = useNavigate();
  const { createPrivateChat, isPending } = useCreatePrivateChat({
    friendId: user._id,
  });

  const [message, setMessage] = useState(`Hello ${user.username}!`);

  const handleSubmit = () => {
    createPrivateChat(
      { friendId: user._id, message },
      {
        onSuccess: (data: Chat, variables, context) => {
          console.log("Chat created successfully!", {
            data,
            variables,
            context,
          });
          setDialogFriend("");
          setCreateOpen(false);
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
          <span className="italic font-bold">{user.username}</span>. Share your
          first message below, and let's kick off our conversation!
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
