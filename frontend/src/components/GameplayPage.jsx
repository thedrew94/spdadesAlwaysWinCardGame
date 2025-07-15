import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import { useEffect, useRef, useState } from "react";
import s4 from "../assets/4S_test.png";
import { svgSelector } from "../utils/svgSelector";
import GameSettingsMenu from "./GameSettingsMenu";
import PlayerInfoPanel from "./PlayerInfoPanel";
import GameInfoBoard from "./GameInfoBoard";
// import avatar2 from "../assets/7C.png";
// import avatar3 from "../assets/12S.png";
// import avatar4 from "../assets/11D.png";
// import avatar5 from "../assets/4H.png";
// import avatar6 from "../assets/10S.png";
// import avatar7 from "../assets/1S.png";
// import avatar8 from "../assets/11H.png";

export default function GameplayPage({ socket }) {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [targetPoints, setTargetPoints] = useState(1);
  const swiperRef = useRef(null);

  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.activeIndex;
      console.log("Active Slide Index:", activeIndex);
      // Trigger your custom event or logic here
      // For example, you can access the active slide's data or perform an action
      const activeSlide = swiperRef.current.swiper.slides[activeIndex];
      console.log("Active Slide:", activeSlide);
      // Example: Trigger a custom event
      const event = new CustomEvent("activeSlideChanged", { detail: { activeIndex } });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on("slideChange", handleSlideChange);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.off("slideChange", handleSlideChange);
      }
    };
  }, []);

  return (
    <div className="gameplaypage">
      <GameSettingsMenu settingsMenuOpen={settingsMenuOpen} setSettingsMenuOpen={setSettingsMenuOpen} />
      <div className="settings_btn_container">
        <button
          className="game_btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSettingsMenuOpen(true);
          }}
        >
          {svgSelector({ svgName: "settings", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
      </div>
      <GameInfoBoard />
      <div className="player_info_panel_container">
        <PlayerInfoPanel />
        <PlayerInfoPanel />
      </div>
      <div className="gameplaypage_gamearea">
        <div className="gameplaypage_gamearea_bg">
          <div className="homepage_title">
            <span className="title_main_letter">S</span>
            <div className="title_side_letter">
              <span>pades</span>
              <span>always wins</span>
            </div>
            <img src="./src/assets/playing_card_256.png" alt="" width="256px" height="256px" draggable="false" />
          </div>
        </div>
        <div>
          <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          <img src={s4} alt="" width="48px" height="48px" draggable="false" />
        </div>
      </div>
      <div className="player_info_panel_container">
        <PlayerInfoPanel />
        <PlayerInfoPanel />
      </div>
      {/* <div className="cards_layer">
        <h6 className="start_info">
          Check your cards. <br /> Choose the number of hands you aim to win accordingly <br />
          Once you are happy with your decision click the play button.
        </h6>
        <div className="input_players">
          <button onClick={() => setTargetPoints((curr) => (curr <= 0 ? curr : curr - 1))}>
            {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
          </button>
          <span>{targetPoints} POINTS</span>
          <button onClick={() => setTargetPoints((curr) => (curr >= 8 ? curr : curr + 1))}>
            {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#3f200b" })}
          </button>
        </div>
        <button className="game_btn">
          PLAY{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
        </button>
      </div> */}
      <div className="cards_swiper">
        <button className="game_btn">PLAY 4S</button>

        <Swiper slidesPerView={1} spaceBetween={5} freeMode={true} ref={swiperRef} className="cardsSwiperEl">
          <SwiperSlide onClick={() => handleSlideClick(Number(0))}>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={s4} alt="" width="48px" height="48px" draggable="false" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
