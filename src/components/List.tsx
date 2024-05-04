import { Chat } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Item, { ItemProps } from "./Item";
import { ScrollArea } from "./ui/scroll-area";

interface ListProps {
  data: Array<ItemProps | Chat>;
  infiniteScrollRef?: (node?: Element | null | undefined) => void;
  isFetching: boolean;
  size?: "default" | "sm" | "lg";
}

const List = ({ data, size, infiniteScrollRef, isFetching }: ListProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ScrollArea className="h-[calc(100vh-9.5rem)]">
        <div className="px-4 py-1 space-y-2">
          {data.map(item => (
            <Item
              key={item._id}
              name={item.name}
              description={
                (item as Chat).lastMessage || (item as ItemProps).description
              }
              time={(item as Chat).updatedAt || (item as ItemProps).time}
              image={item.image}
              ping={item.ping}
              size={size}
              onClick={() => {
                navigate(`${item._id}`);
              }}
            />
          ))}
        </div>
        <div ref={infiniteScrollRef}>
          {isFetching && (
            <Loader2 className="mt-2 mx-auto animate-spin text-muted-foreground" />
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default List;
