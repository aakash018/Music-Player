import React, { useContext } from "react";

//Context
import { Playing } from "../../Context/Playing";

//Hooks
import useGetScrollPositon from "../../CustomHooks/useGetScrollPosition";

import "./mainBanner.css";

function MainBanner({ toggle }) {
  const { playing, setPlaying } = useContext(Playing);

  const getTopPosition = useGetScrollPositon();

  return (
    <div className="mainBanner">
      <div className="mainBannerWraper">
        <div
          className={getTopPosition > 75 ? "liveText liveTexthide" : "liveText"}
        >
          Live
        </div>

        <div
          className={
            getTopPosition > 75 ? "playButton playButtonhide" : "playButton"
          }
          onClick={() => {
            setPlaying(!playing);
            toggle();
          }}
        >
          <div className="playButtonWraper">
            <div
              className={
                playing ? "playButtonTriangle playing" : "playButtonTriangle "
              }
            ></div>
          </div>
        </div>
        <div
          className={
            getTopPosition > 75 ? "musicText musicTexthide" : "musicText"
          }
        >
          the Music
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
