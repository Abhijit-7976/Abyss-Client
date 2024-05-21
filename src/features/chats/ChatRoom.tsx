import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Chat, ChatMessage } from "@/lib/types";
import { AppDispatch, type RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PanelRight,
  Phone,
  Plus,
  Search,
  SendHorizontal,
  Video,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { type Socket } from "socket.io-client";
import { z } from "zod";
import { useUser } from "../authentication/useUser";
import { MemoizedChatRoomMessages } from "./ChatRoomMessages";
import { addNewMessage } from "./newMessagesSlice";
import { usePrivateChat } from "./useChat";

const formSchema = z.object({
  messageText: z.string(),
});

const ChatRoom = () => {
  const { privateChat, isPending } = usePrivateChat();
  const { user } = useUser();
  const chatSocket = useSelector<RootState, Socket>(
    state => state.ws.chatSocket
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    chatSocket.on(
      "new-message",
      ({ chat, message }: { chat: Chat; message: ChatMessage }) => {
        console.log({ chat, message });
        dispatch(addNewMessage({ chatId: chat._id, message }));
      }
    );

    return () => {
      chatSocket.off("new-message");
    };
  }, [chatSocket, dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageText: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const message = { text: values.messageText };

    chatSocket.emit(
      "send-message",
      {
        sender: user,
        chat: privateChat,
        message,
      },
      ({ chat, message }: { chat: Chat; message: ChatMessage }) => {
        dispatch(addNewMessage({ chatId: chat._id, message }));
      }
    );

    form.reset();
  }

  return (
    <>
      <div className="h-16 flex items-center gap-3 px-4 py-3 border-b">
        {isPending ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <Avatar className="h-10">
            <AvatarImage
              src={privateChat!.image}
              alt={privateChat!.name}
            />
            <AvatarFallback className="text-lg font-semibold">
              {privateChat!.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        {isPending ? (
          <div className="space-y-1">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-3.5 w-36" />
          </div>
        ) : (
          <div>
            <h5 className="text-md font-semibold tracking-tight w-full">
              {privateChat!.name}
            </h5>

            {/* <p className="text-sm text-muted-foreground overflow-hidden w-full">
              Online
            </p> */}
          </div>
        )}
        <div className="ml-auto space-x-2">
          <Button
            disabled={isPending}
            variant="ghost"
            size="icon">
            <Video className="size-5" />
          </Button>
          <Button
            disabled={isPending}
            variant="ghost"
            size="icon">
            <Phone className="size-5" />
          </Button>
          <Button
            disabled={isPending}
            variant="ghost"
            size="icon">
            <PanelRight className="size-5" />
          </Button>
        </div>
      </div>

      <MemoizedChatRoomMessages />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-16 flex items-center gap-2 border-t px-4 py-3">
          <Button
            type="button"
            disabled={isPending}
            className="rounded-full"
            variant="secondary"
            size="icon">
            <Plus />
          </Button>

          <FormField
            control={form.control}
            name="messageText"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Search"
                      className="pl-8 bg-background/60 hover:bg-background/80 transition-colors"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="rounded-full"
            variant="default"
            size="icon">
            <SendHorizontal />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChatRoom;
