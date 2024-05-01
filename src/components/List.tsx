import { Chat } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Item, { ItemProps } from "./Item";
import { ScrollArea } from "./ui/scroll-area";

interface ListProps {
  data: Array<ItemProps | Chat>;
  infiniteScrollRef?: (node?: Element | null | undefined) => void;
  isFetching: boolean;
}

const List = ({ data, infiniteScrollRef, isFetching }: ListProps) => {
  return (
    <>
      <ScrollArea className="h-[calc(100vh-9.5rem)]">
        <div className="px-4 space-y-2">
          {data.map(item => (
            <Item
              key={item._id}
              name={item.name}
              description={item.description}
              time={item.time}
              image={item.image}
              ping={item.ping}
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
