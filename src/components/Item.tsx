import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export interface ItemProps extends React.ComponentProps<typeof Button> {
  username: string;
  description?: string;
  avatar?: string;
  time?: Date;
  active?: boolean;
  ping?: boolean;
}

const Item = ({
  username,
  description,
  avatar,
  time,
  active,
  ping,
  className,
}: ItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "relative px-4 py-3 h-20 w-full  grid grid-cols-[3rem_minmax(0,_1fr)_max-content] grid-rows-2 gap-x-4",
        active && "bg-accent",
        className
      )}>
      <Avatar className="relative size-12 row-span-2 ring-2 ring-background">
        <AvatarImage
          src={avatar || ""}
          alt={username}
        />
        <AvatarFallback className={cn("text-lg")}>
          {username.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h5
        className={cn(
          "text-lg font-semibold tracking-tight w-full text-left",
          !description && "row-span-2"
        )}>
        {username}
      </h5>
      {time && (
        <p className="text-sm text-muted-foreground justify-self-end">
          {format(time.toString(), "p")}
        </p>
      )}
      {description && (
        <p className="text-sm text-muted-foreground overflow-hidden w-full text-left row-start-2 col-start-2">
          {description}
        </p>
      )}
      <span
        className={cn(
          "relative hidden h-2 w-2 justify-self-end",
          ping && "flex",
          !time && "row-span-2"
        )}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
    </Button>
  );
};

export default Item;
