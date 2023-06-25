import { useState, useEffect, useRef } from "react";
type TimerProps = {
  duration: number;
  onExpired: () => void;
};

const Timer = ({ duration, onExpired }: TimerProps) => {
  const SECONDS = 1000;
  const MINUTES = 60 * SECONDS;
  const HOUR = 60 * MINUTES;
  const DAY = 24 * HOUR;
  const [time, setTime] = useState(duration);
  const timerId = useRef(0);

  useEffect(() => {
    if (time < 0) {
      onExpired();
      clearTimeout(timerId.current);
    } else {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        setTime((time) => time - 1000);
      }, 1000);
    }
    () => {
      clearTimeout(timerId.current);
    };
  }, [time, duration, onExpired]);
  const getFormattedTime = (getTime: number) => {
    const day = Math.floor(getTime / DAY);
    const hour = Math.floor((getTime % DAY) / HOUR);
    const minute = Math.floor((getTime % HOUR) / MINUTES);
    const second = Math.floor((getTime % MINUTES) / SECONDS);

    return `${day}:${hour}:${minute}:${second}`;
  };
  return <div>{getFormattedTime(time)}</div>;
};

export default Timer;
