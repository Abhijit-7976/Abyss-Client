import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export interface ItemProps extends React.ComponentProps<typeof Button> {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  time?: Date;
  active?: boolean;
  ping?: boolean;
}

const Item = ({
  name,
  description,
  image,
  time,
  active,
  ping,
  className,
  size,
  onClick,
}: ItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "px-4 py-3 h-20 w-full grid grid-cols-[3rem_minmax(0,_1fr)_max-content] grid-rows-2 gap-x-4",
        active && "bg-accent",
        size === "sm" && "h-fit px-2.5 py-1 gap-x-1",
        className
      )}
      onClick={onClick}>
      <Avatar
        className={cn(
          "size-12 row-span-2 ring-2 ring-background",
          size === "sm" && "size-10"
        )}>
        <AvatarImage
          src={image || ""}
          alt={name}
        />
        <AvatarFallback
          className={cn("text-xl font-semibold", size === "sm" && "text-md")}>
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h5
        className={cn(
          "text-lg font-semibold tracking-tight w-full text-left",
          size === "sm" && "text-md",
          !description && "row-span-2"
        )}>
        {name}
      </h5>
      {time && (
        <p className="text-sm text-muted-foreground justify-self-end">
          {format(time, "HH:mm")}
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
