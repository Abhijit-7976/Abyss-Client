import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Grid from "@mui/material/Grid";

const streams = Array.from({
  length: 9,
});

const CallRoomStreams = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center sm:px-4 sm:py-2 ">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}>
        {streams.map((_, index) => {
          let cols = 3;
          if (streams.length < 3) cols = streams.length;
          else if (streams.length < 5) cols = 2;

          const colWidth = 12 / cols;

          return (
            <Grid
              key={index}
              item
              xs={colWidth}>
              <Card className="relative h-full flex flex-col p-1 justify-center overflow-hidden">
                <video className="size-full bg-black rounded-sm aspect-video" />
                <p className="absolute bottom-4 left-4 text-gray-300 drop-shadow-md">
                  Abhijit Mahato
                </p>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CallRoomStreams;
