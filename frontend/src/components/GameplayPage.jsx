import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import s4 from "../assets/4S_test.png";
import { useRef } from "react";
import PlayerInfoPanel from "./PlayerInfoPanel";
// import avatar2 from "../assets/7C.png";
// import avatar3 from "../assets/12S.png";
// import avatar4 from "../assets/11D.png";
// import avatar5 from "../assets/4H.png";
// import avatar6 from "../assets/10S.png";
// import avatar7 from "../assets/1S.png";
// import avatar8 from "../assets/11H.png";

export default function GameplayPage() {
  const swiperRef = useRef(null);

  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="gameplaypage">
      <div className="player_info_panel_container">
        <PlayerInfoPanel />
        <PlayerInfoPanel />
        <PlayerInfoPanel />
      </div>
      <div className="cards_swiper">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          ref={swiperRef}
          className="mySwiper2"
          // breakpoints={{
          //   0: { slidesPerView: 2, spaceBetween: 20 },
          //   768: { slidesPerView: 3, spaceBetween: 30 },
          //   1024: { slidesPerView: 3, spaceBetween: 30 },
          // }}
        >
          <SwiperSlide onClick={() => handleSlideClick(1)}>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card_container">
              <img src={s4} alt="" width="48px" height="48px" draggable="false" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
