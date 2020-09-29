import React, { useEffect, useState } from "react";
import Slider from "../Slider/slider";

function ProgressBar({ audio, width }) {
  const [skipTime, setSkipTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(audio.currentTime);

  useEffect(() => {
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
    return audio.removeEventListener("timeupdate", () => {});
  }, [audio]);

  const handleSkip = () => {
    audio.currentTime = skipTime;
  };

  return (
    <>
      <div className="progressBarContainer">
        <Slider
          setValue={setSkipTime}
          handelChange={handleSkip}
          value={currentTime}
          min={0}
          max={audio.duration}
          step={1}
        />
      </div>
    </>
  );
}

export default ProgressBar;
