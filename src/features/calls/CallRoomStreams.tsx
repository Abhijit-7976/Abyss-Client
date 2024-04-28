import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const streams = Array.from({
  length: 9,
});

const CallRoomStreams = () => {
  const rows = Math.ceil(streams.length / 3);
  const cols = streams.length < 3 ? streams.length : 3;
  console.log(rows, cols);

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center p-6">
      <div className={cn("w-full h-full grid gap-2", cols && `grid-cols-3`)}>
        {streams.map((_, index) => (
          <Card
            key={index}
            className="flex p-2 items-center overflow-hidden">
            <video className="w-full bg-black" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CallRoomStreams;
