import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

const Duration = (props: React.ComponentProps<typeof Badge>) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes => minutes + 1);
        if (minutes === 59) {
          setHours(hours => hours + 1);
          setMinutes(0);
        }
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  });
  return (
    <Badge
      variant="outline"
      className={props.className}>
      {hours && hours < 10 ? "0" + hours : hours}:
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </Badge>
  );
};

export default Duration;
