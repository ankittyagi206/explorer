import Timer from "./Timer";
import { useState } from "react";

type TimerWrapperProps = {
  duration: number;
  onExpired: () => void;
};

function TimerWrapper({ duration, onExpired }: TimerWrapperProps) {
  const [isExpired, setIsExpired] = useState(false);
  const handleReset = () => {
    onExpired && onExpired();
    setIsExpired(false);
  };
  const handleOnExpired = () => {
    onExpired && onExpired();
    setIsExpired(true);
  };
  return !isExpired ? (
    <Timer duration={duration} onExpired={handleOnExpired} />
  ) : (
    <button onClick={handleReset}>Reset</button>
  );
}

export default TimerWrapper;
