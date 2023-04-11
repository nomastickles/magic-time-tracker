import React, { useEffect, useState } from "react";
import { Number } from "./Number";
import { Word } from "./Word";

export const TimeSinceTimestamp = ({
  timestamp = Date.now(),
  showMilliseconds = false,
  showSeconds = true,
  isSaving = false,
}) => {
  const [millis, setMillis] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const isFuture = Date.now() - timestamp < 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const diffFromTimestamp = Date.now() - timestamp;

      setMillis(diffFromTimestamp % 99);
      setSeconds(Math.floor((diffFromTimestamp / 1000) % 60));
      setMinutes(Math.floor((diffFromTimestamp / 1000 / 60) % 60));
      setHours(Math.floor(diffFromTimestamp / 1000 / 60 / 60));
    }, 60);

    return () => clearInterval(interval);
  }, [timestamp]);

  if (isFuture) {
    return (
      <div className="clock">
        <div className="countdown">
          <Word value={"FUTURE"} />
        </div>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div className="clock">
        <div className="countdown animate__animated animate__fadeIn">
          <Word value={"SAVING.."} />
        </div>
      </div>
    );
  }

  return (
    <div className="clock">
      <div className="countdown">
        <Number value={hours} />
        <Word value={":"} />
        <Number value={minutes} />
        {showSeconds && (
          <>
            <Word value={":"} />
            <Number value={seconds} />
          </>
        )}
        {showMilliseconds && (
          <>
            <Word value={":"} />
            <Number value={millis} />
          </>
        )}
      </div>
    </div>
  );
};
