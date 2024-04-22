import { Search } from "lucide-react";
import Item, { ItemProps } from "./Item";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface ListProps {
  data: Array<ItemProps>;
}

const List = ({ data }: ListProps) => {
  return (
    <>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8 bg-background/60 hover:bg-background/80 transition-colors"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-8.5rem)]">
        <div className="px-4 space-y-2">
          {data.map(item => (
            <Item
              username={item.username}
              description={item.description}
              time={item.time}
              avatar={item.avatar}
              ping={item.ping}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default List;
