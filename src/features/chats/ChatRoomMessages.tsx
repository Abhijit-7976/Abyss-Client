import Message from "@/components/Message";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { useChatMessages } from "./useChatMessages";

const ChatRoomMessages = () => {
  const { user } = useUser();
  const { chatId } = useParams();

  const { chatMessageData, isPending, fetchNextPage, isFetchingNextPage } =
    useChatMessages();

  const newMessagesMap = useSelector((state: RootState) => state.newMessages);

  const newMessages = newMessagesMap.get(chatId!) || [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) {
    return (
      <div className="h-[calc(100vh-8rem)]">
        <Loader2 className="mx-auto mt-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <div
        id="chat_room_messages"
        className="flex flex-col-reverse overflow-auto h-[calc(100vh-8rem)] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-border scrollbar-track-background">
        <div className="flex-1 flex flex-col px-32 py-2">
          {chatMessageData.map((message, index) => {
            const isCurrentUser = message.sender._id === user?._id;
            const isPrevSameSender =
              chatMessageData[index - 1]?.sender._id === message.sender._id;

            const nextMessage =
              index < chatMessageData.length - 1
                ? chatMessageData[index + 1]
                : newMessages[0];

            const isNextSameSender =
              nextMessage?.sender._id === message.sender._id;
            return (
              <Message
                isAvatar={!isCurrentUser}
                key={message._id}
                data={message}
                isCurrentUser={isCurrentUser}
                isPrevSameSender={isPrevSameSender}
                isNextSameSender={isNextSameSender}
              />
            );
          })}
          {newMessages.map((message, index) => {
            const isCurrentUser = message.sender._id === user?._id;
            const prevMessage =
              index > 0
                ? newMessages[index - 1]
                : chatMessageData[chatMessageData.length - 1];

            const isPrevSameSender =
              prevMessage?.sender._id === message.sender._id;
            const isNextSameSender =
              newMessages[index + 1]?.sender._id === message.sender._id;
            return (
              <Message
                isAvatar={!isCurrentUser}
                key={message._id}
                data={message}
                isCurrentUser={isCurrentUser}
                isPrevSameSender={isPrevSameSender}
                isNextSameSender={isNextSameSender}
              />
            );
          })}
        </div>
        <div
          ref={ref}
          className={cn("h-full", isFetchingNextPage && "h-fit")}>
          {isFetchingNextPage && (
            <Loader2 className="my-2 mx-auto animate-spin text-muted-foreground" />
          )}
        </div>
      </div>
    </>
  );
};

export const MemoizedChatRoomMessages = memo(ChatRoomMessages);
