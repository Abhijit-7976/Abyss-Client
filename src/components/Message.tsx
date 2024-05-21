import { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface MessageProps {
  data: ChatMessage;
  isCurrentUser: boolean;
  isPrevSameSender: boolean;
  isNextSameSender: boolean;
}

const Message = ({
  data,
  isCurrentUser,
  isPrevSameSender,
  isNextSameSender,
}: MessageProps) => {
  return (
    <div
      className={cn(
        "flex max-w-[35%] gap-2 my-0.5",
        !isPrevSameSender && "mt-2",
        !isNextSameSender && "mb-2",
        isCurrentUser && "flex-row-reverse self-end"
      )}>
      <Avatar
        className={cn(
          "size-8",
          isPrevSameSender && "invisible",
          isCurrentUser && "border ring-2 ring-primary"
        )}>
        <AvatarImage
          src={data.sender.avatar || ""}
          alt={data.sender.username || "user avatar"}
        />
        <AvatarFallback className="text-md font-semibold">
          {data.sender.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "relative flex p-2 border rounded-md",
          isCurrentUser && "bg-primary text-primary-foreground",
          !isPrevSameSender && !isCurrentUser && "rounded-tl-none",
          !isPrevSameSender && isCurrentUser && "rounded-tr-none"
          // Math.random() > 0.5
          //   ? "bg-red-500 text-primary-foreground"
          //   : "bg-green-500 text-primary"
        )}>
        <p>
          {data.text?.trim()}
          <span className="ml-5 invisible text-xs text-[.7rem]">00:00</span>
          <span
            className={cn(
              "absolute bottom-1 right-2 self-end text-[.7rem] text-foreground/70",
              isCurrentUser && "text-primary-foreground/70"
            )}>
            {format(data.createdAt, "HH:mm")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Message;
