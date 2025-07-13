import { useState } from "react";
import { svgSelector } from "../utils/svgSelector";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import avatar1 from "../assets/avatar_1.png";
import avatar2 from "../assets/avatar_2.png";
import avatar3 from "../assets/avatar_3.png";
import avatar4 from "../assets/avatar_4.png";
import avatar5 from "../assets/avatar_5.png";
import avatar6 from "../assets/avatar_6.png";
import avatar7 from "../assets/avatar_7.png";
import avatar8 from "../assets/avatar_8.png";

export default function Homepage() {
  const [page, setPage] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [playersCount, setPlayersCount] = useState(2);

  return (
    <div className="homepage">
      <div className="homepage_title">
        <span className="title_main_letter">S</span>
        <div className="title_side_letter">
          <span>pades</span>
          <span>always wins</span>
        </div>
        <img src="./src/assets/playing_card_256.png" alt="" width="256px" height="256px" draggable="false" />
      </div>
      {/* <button className="keycap_btn">
                  <span className="keycap_btn_letter">OK</span>
                </button> */}
      <div className="homepage_game_home">
        {page === 1 && (
          <div className="game_btns_home">
            <button className="game_btn" onClick={() => setPage(2)}>
              PLAY{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
            <button className="game_btn">
              RULES{svgSelector({ svgName: "rules", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
            <button className="game_btn">
              SUPPORT{svgSelector({ svgName: "love", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
          </div>
        )}

        {page === 2 && (
          <div className="game_btns_start">
            <button className="game_btn" onClick={() => setPage(3)}>
              NEW GAME{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
            <button className="game_btn">
              JOIN GAME{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
            <button className="game_btn" onClick={() => setPage(1)}>
              GO BACK{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
          </div>
        )}

        {page === 3 && (
          <div className="game_btns_new">
            <div className="input_username">
              <input
                type="text"
                name=""
                id=""
                placeholder="Player username"
                autoComplete="off"
                className="input_text_default"
              />
              {svgSelector({ svgName: "pen", svgWidth: "28px", svgHeight: "28px", svgFill: "#8b4513" })}
            </div>
            <div className="avatar_selection_swiper">
              <Swiper
                slidesPerView={4}
                spaceBetween={5}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                // breakpoints={{
                //   0: { slidesPerView: 2, spaceBetween: 20 },
                //   768: { slidesPerView: 3, spaceBetween: 30 },
                //   1024: { slidesPerView: 3, spaceBetween: 30 },
                // }}
              >
                <SwiperSlide
                  onClick={() => setSelectedAvatar(1)}
                  className={`${selectedAvatar === 1 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar1} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(2)}
                  className={`${selectedAvatar === 2 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar2} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(3)}
                  className={`${selectedAvatar === 3 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar3} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(4)}
                  className={`${selectedAvatar === 4 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar4} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(5)}
                  className={`${selectedAvatar === 5 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar5} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(6)}
                  className={`${selectedAvatar === 6 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar6} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(7)}
                  className={`${selectedAvatar === 7 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar7} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(8)}
                  className={`${selectedAvatar === 8 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar8} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  onClick={() => setSelectedAvatar(1)}
                  className={`${selectedAvatar === 1 && "avatar_selected"}`}
                >
                  <div className="avatar_container">
                    <img src={avatar1} alt="" width="48px" height="48px" draggable="false" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="input_players">
              <button onClick={() => setPlayersCount((curr) => (curr <= 2 ? curr : curr - 1))}>
                {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
              </button>
              <span>{playersCount} players</span>
              <button onClick={() => setPlayersCount((curr) => (curr >= 8 ? curr : curr + 1))}>
                {svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
              </button>
            </div>
            <button className="game_btn" onClick={() => setPage(2)}>
              START GAME{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
            <button className="game_btn" onClick={() => setPage(2)}>
              GO BACK{svgSelector({ svgName: "play", svgWidth: "28px", svgHeight: "28px", svgFill: "#f1dabb" })}
            </button>
          </div>
        )}

        <a href="#" className="game_link">
          This game was made with LOVE by <br />
          Tornyai Laurentiu Andrei
        </a>
      </div>
    </div>
  );
}
