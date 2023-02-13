import Button from "react-bootstrap/Button";
import "./CounterStyles.css";
import React, { useState, useEffect } from "react";

function Counter() {
  const [minute, setMinutes] = useState("25");
  const [second, setSeconds] = useState("00");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      let prevMinute;
      interval = setInterval(() => {
        setMinutes((prevMinute) => {
          if (prevMinute === "00" && second === "00") {
            clearInterval(interval);
            setIsActive(false);
            return "00";
          } else if (prevMinute !== "00" && second === "00") {
            return (prevMinute - 1).toString().padStart(2, "0");
          }
          return prevMinute;
        });
        setSeconds((prevSecond) => {
          if (prevSecond === "00" && prevMinute !== "00") {
            return "59";
          } else if (prevSecond === "00" && prevMinute === "00") {
            return "00";
          }
          return (prevSecond - 1).toString().padStart(2, "0");
        });
      }, 1000);
    } else if (!isActive && second !== "00") {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, second]);

  return (
    <div>
      <div className="layout">
        <div className="jelly">
          <div className="button-space">
            <Button
              onClick={() => setIsActive(!isActive)}
              className="button-layout"
              variant="success"
            >
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button
              onClick={() => {
                setIsActive(false);
                setMinutes("25");
                setSeconds("00");
              }}
              className="button-layout"
              variant="danger"
            >
              Reset
            </Button>
          </div>
          <div className="timer-layout">
            <div className="timer">
              <span className="minute">{minute}</span>
              <span>:</span>
              <span className="second">{second}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
