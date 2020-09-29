import React, { useContext, useEffect, useState } from "react";
import RoundButtons from "../RoundButtons/roundButtons";

import MdVolumeUp from "react-ionicons/lib/MdVolumeUp";
import MdVolumeDown from "react-ionicons/lib/MdVolumeDown";
import Slider from "../Slider/slider";
import { Playing } from "../../Context/Playing";

import "./volumeControl.css";

function VolumeControl({ audio }) {
  const { volume, setVolume } = useContext(Playing);
  const [slider, setSlider] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState(Boolean);

  useEffect(() => {
    setVolumeIcon(audio.volume > 0.4 ? true : false);
  }, [audio.volume]);

  const handleVolumeChange = () => {
    audio.volume = volume;
    localStorage.setItem("-music-app-volume", volume);
  };

  const handleVolumeShow = () => {
    setSlider(!slider);
  };

  return (
    <div
      className={slider ? "volumeContainer show" : "volumeContainer"}
      onMouseEnter={handleVolumeShow}
      onMouseLeave={handleVolumeShow}
    >
      <section className="volumeIcon">
        <RoundButtons
          text={
            volumeIcon ? (
              <MdVolumeUp color="white" />
            ) : (
              <MdVolumeDown color="white" />
            )
          }
          backgroundColor="rgb(0,0,0,0)"
          width="25px"
          height="25px"
        />
      </section>
      <section className="volumeSliderContainer">
        <Slider
          setValue={setVolume}
          handelChange={handleVolumeChange}
          value={volume}
        />
      </section>
    </div>
  );
}

export default VolumeControl;
