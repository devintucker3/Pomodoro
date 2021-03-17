import React, { useState } from "react";
import ControlButtons from "./ControlButtons";
import TimeDuration from "./TimeDuration";
import TimerDisplay from "./TimerDisplay";

function Pomodoro() {
  // initial default pomodoro state
  const initialState ={
    focusTime: 25,
    breakTime: 5,
    display: "none",
    focusSeconds: 1500,
    breakSeconds: 300,
    counter: 0,
    focusOrBreak: "Focusing",
    onFocus: true,
  };

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerData, setTimerData] = useState({...initialState});

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setTimerData({...timerData, display: "block"})
  }

  function stop() {
    setTimerData({...initialState});
    setIsTimerRunning(false);
  }

  return (
    <div className="pomodoro">
      <TimeDuration timerData={timerData} isTimerRunning={isTimerRunning} setTimerData={setTimerData} />
      <ControlButtons playPause={playPause} stop={stop} isTimerRunning={isTimerRunning} />
      <TimerDisplay timerData={timerData} isTimerRunning={isTimerRunning} setTimerData={setTimerData} />
    </div>
  );
}

export default Pomodoro;
