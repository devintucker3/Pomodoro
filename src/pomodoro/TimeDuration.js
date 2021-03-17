import React from "react";
import {minutesToDuration} from "../utils/duration";

function TimeDuration({timerData, isTimerRunning, setTimerData}) {
    const handleIncreaseDecrease = event => {
        event.preventDefault();
        const button = event.target.nodeName === "SPAN" ? event.target.parentNode.name : event.target.name;
        let newTime = 0;
        switch (button) {
            case "decrease-focus":
                newTime = Math.max(timerData.focusTime - 5, 5);
                setTimerData(data => {
                    const newData = {
                        ...data,
                        focusTime: newTime,
                        focusSeconds: newTime * 60,
                    };
                    return newData;
                });
                break;
            case "increase-focus":
                newTime = Math.min(timerData.focusTime + 5, 60);
                setTimerData(data => {
                    return {
                        ...data,
                        focusTime: newTime,
                        focusSeconds: newTime * 60,
                    };
                });
                break;
            case "decrease-break":
                newTime = Math.max(timerData.breakTime - 1, 1);
                setTimerData(data => {
                    return {
                        ...data,
                        breakTime: newTime,
                        breakSeconds: newTime * 60,
                    };
                });
                break;
            case "increase-break":
                newTime = Math.min(timerData.breakTime + 1, 15);
                setTimerData(data => {
                    return {
                        ...data,
                        breakTime: newTime,
                        breakSeconds: newTime * 60,
                    };
                });
                break;
            default:
                break;
        };
    };

    return (
        <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(timerData.focusTime)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled={isTimerRunning}
                onClick={handleIncreaseDecrease}
                name="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled={isTimerRunning}
                onClick={handleIncreaseDecrease}
                name="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(timerData.breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  disabled={isTimerRunning}
                    onClick={handleIncreaseDecrease}
                    name="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  disabled={isTimerRunning}
                    onClick={handleIncreaseDecrease}
                    name="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TimeDuration;