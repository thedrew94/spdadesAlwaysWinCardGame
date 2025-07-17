import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import c2 from "../assets/cropped_cards/2C.png";
import d2 from "../assets/cropped_cards/2D.png";
import h2 from "../assets/cropped_cards/2H.png";
import s2 from "../assets/cropped_cards/2S.png";
import c3 from "../assets/cropped_cards/3C.png";
import d3 from "../assets/cropped_cards/3D.png";
import h3 from "../assets/cropped_cards/3H.png";
import s3 from "../assets/cropped_cards/3S.png";
import c4 from "../assets/cropped_cards/4C.png";
import d4 from "../assets/cropped_cards/4D.png";
import h4 from "../assets/cropped_cards/4H.png";
import s4 from "../assets/cropped_cards/4S.png";
import c5 from "../assets/cropped_cards/5C.png";
import d5 from "../assets/cropped_cards/5D.png";
import h5 from "../assets/cropped_cards/5H.png";
import s5 from "../assets/cropped_cards/5S.png";
import c6 from "../assets/cropped_cards/6C.png";
import d6 from "../assets/cropped_cards/6D.png";
import h6 from "../assets/cropped_cards/6H.png";
import s6 from "../assets/cropped_cards/6S.png";
import c7 from "../assets/cropped_cards/7C.png";
import d7 from "../assets/cropped_cards/7D.png";
import h7 from "../assets/cropped_cards/7H.png";
import s7 from "../assets/cropped_cards/7S.png";
import c8 from "../assets/cropped_cards/8C.png";
import d8 from "../assets/cropped_cards/8D.png";
import h8 from "../assets/cropped_cards/8H.png";
import s8 from "../assets/cropped_cards/8S.png";
import c9 from "../assets/cropped_cards/9C.png";
import d9 from "../assets/cropped_cards/9D.png";
import h9 from "../assets/cropped_cards/9H.png";
import s9 from "../assets/cropped_cards/9S.png";
import c10 from "../assets/cropped_cards/10C.png";
import d10 from "../assets/cropped_cards/10D.png";
import h10 from "../assets/cropped_cards/10H.png";
import s10 from "../assets/cropped_cards/10S.png";
import c11 from "../assets/cropped_cards/11C.png";
import d11 from "../assets/cropped_cards/11D.png";
import h11 from "../assets/cropped_cards/11H.png";
import s11 from "../assets/cropped_cards/11S.png";
import c12 from "../assets/cropped_cards/12C.png";
import d12 from "../assets/cropped_cards/12D.png";
import h12 from "../assets/cropped_cards/12H.png";
import s12 from "../assets/cropped_cards/12S.png";
import c13 from "../assets/cropped_cards/13C.png";
import d13 from "../assets/cropped_cards/13D.png";
import h13 from "../assets/cropped_cards/13H.png";
import s13 from "../assets/cropped_cards/13S.png";
import c15 from "../assets/cropped_cards/15C.png";
import d15 from "../assets/cropped_cards/15D.png";
import h15 from "../assets/cropped_cards/15H.png";
import s15 from "../assets/cropped_cards/15S.png";

import { useGlobal } from "./GlobalProvider";

// prettier-ignore
const cardImages = { C_2: c2, D_2: d2, H_2: h2, S_2: s2, C_3: c3, D_3: d3, H_3: h3, S_3: s3, C_4: c4, D_4: d4, H_4: h4, S_4: s4, C_5: c5, D_5: d5, H_5: h5, S_5: s5, C_6: c6, D_6: d6, H_6: h6, S_6: s6, C_7: c7, D_7: d7, H_7: h7, S_7: s7, C_8: c8, D_8: d8, H_8: h8, S_8: s8, C_9: c9, D_9: d9, H_9: h9, S_9: s9, C_10: c10, D_10: d10, H_10: h10, S_10: s10, C_15: c15, D_15: d15, H_15: h15, S_15: s15 };

export default function PlayerCardsHand({ isInitialPhase = true }) {
  const { userData } = useGlobal();
  const [btnText, setBtnText] = useState("PLAY");
  const swiperRef = useRef(null);

  function playCard() {
    console.log("played", btnText);
  }

  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.activeIndex;
      const activeSlide = swiperRef.current.swiper.slides[activeIndex];
      const cardData = activeSlide.getAttribute("data-card");
      setBtnText(`PLAY ${cardData}` || "PLAY");
      // Example: Trigger a custom event
      // const event = new CustomEvent("activeSlideChanged", { detail: { activeIndex } });
      // window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on("slideChange", handleSlideChange);
    }

    return () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.off("slideChange", handleSlideChange);
      }
    };
  }, []);

  return (
    <div className="cards_swiper">
      {!isInitialPhase && (
        <button className="game_btn" onClick={() => playCard()}>
          {btnText}
        </button>
      )}

      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        freeMode={true}
        ref={swiperRef}
        className="cardsSwiperEl"
        style={{
          "--card-w": isInitialPhase ? "198px" : "99px",
          "--card-h": isInitialPhase ? "256px" : "128px",
        }}
      >
        {userData.playerCards.map((p, idx) => {
          return (
            <SwiperSlide
              key={`card_${idx}`}
              data-card={`${p.split("_")[1]}${p.split("_")[0]}`}
              onClick={() => handleSlideClick(Number(idx))}
            >
              <img
                src={cardImages[p]}
                alt={`Card: ${p}`}
                title={`Card: ${p}`}
                width="48px"
                height="48px"
                draggable="false"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
