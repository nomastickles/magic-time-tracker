import React, { useEffect, useState } from "react";
import { Number } from "./Number";
import { Word } from "./Word";
import NightTimeSwitch from "../NightTimeSwitch";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const ClockOfTimestamp = ({
  h24 = false,
  timestamp = Date.now(),
  title = "",
  showCalendar = false,
  showSeconds = false,
  showSleepToggle = false,
  isNightTime = false,
  onClick = () => {},
}) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [day, setDay] = useState(0);
  const [pm, setPm] = useState(false);

  useEffect(() => {
    const update = () => {
      const date = new Date(timestamp);
      let hour = date.getHours();
      if (!h24) {
        hour = hour % 12 || 12;
      }
      setHour(hour);
      setMinute(date.getMinutes());
      setSecond(date.getSeconds());
      setDay(date.getDay());
      setPm(date.getHours() >= 12);
    };

    update();

    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, [h24, timestamp]);

  return (
    <div className="clock">
      {title && (
        <div className="calendar">
          {showSleepToggle && <NightTimeSwitch isNightTime={isNightTime} />}
          <Word value={title} />
        </div>
      )}
      {showCalendar && (
        <div className="calendar">
          {days.map((value, index) => (
            <Word key={value} value={value} hidden={index !== day} />
          ))}
        </div>
      )}
      <div className="row" onClick={onClick}>
        <div className="hour">
          <Number value={hour} />
          <Word value={":"} />
          <Number value={minute} />
          {showSeconds && (
            <>
              <Word value={":"} />
              <Number value={second} />
            </>
          )}
        </div>
        {!h24 && (
          <div className="ampm" onClick={onClick}>
            <Word value={"AM"} hidden={pm} />
            <Word value={"PM"} hidden={!pm} />
          </div>
        )}
      </div>
    </div>
  );
};
