import React from "react";
import { minutesToDuration , secondsToDuration} from "../utils/duration";
import useInterval from "../utils/useInterval";

function TimerDisplay({timerData, isTimerRunning, setTimerData}) {
    let {focusTime, breakTime, focusSeconds, breakSeconds, counter, focusOrBreak, onFocus} = timerData;

    let paused = !isTimerRunning ? "block" : "none";
    let currentSession = onFocus ? {mins: focusTime, secs: focusSeconds} : {mins: breakTime, secs: breakSeconds}

    useInterval(
        () => {
        // ToDo: Implement what should happen when the timer is running
        setTimerData(data => {
            if (data.focusOrBreak === "Focusing" && data.counter >= data.focusSeconds) {
                new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
                data.counter = 0;
                data.focusOrBreak = "On Break";
                data.onFocus = !data.onFocus;
            } else if (data.focusOrBreak === "On Break" && data.counter >= data.breakSeconds) {
                data.counter = 0;
                data.focusOrBreak = "Focusing"
                data.onFocus = !data.onFocus;
                new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
            }
            return {...data, counter: data.counter + 1}
        })
        },
        isTimerRunning ? 1000 : null
    );

    let barChange = `${(counter / currentSession.secs) * 100}`


    return (
        <div style={{display: `${timerData.display}`}}>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{focusOrBreak} for {minutesToDuration(currentSession.mins)} minutes</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(currentSession.secs - counter)} remaining
            </p>
          </div>
        </div>
        <div style={{display: paused}}>
            <h3>Paused</h3>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={barChange} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${barChange}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default TimerDisplay;