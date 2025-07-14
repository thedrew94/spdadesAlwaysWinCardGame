import { useEffect, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import avatar1 from "../assets/avatar_1.png";
import avatar2 from "../assets/avatar_2.png";
import avatar3 from "../assets/avatar_3.png";
import avatar4 from "../assets/avatar_4.png";
import avatar5 from "../assets/avatar_5.png";
import avatar6 from "../assets/avatar_6.png";
import avatar7 from "../assets/avatar_7.png";
import avatar8 from "../assets/avatar_8.png";

export default function AvatarSelection() {
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  useEffect(() => {
    console.log("s", selectedAvatar);
  }, [selectedAvatar]);

  return (
    <div className="avatar_selection_swiper">
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="avatar_swiper"
      >
        <SwiperSlide onClick={() => setSelectedAvatar(1)} className={`${selectedAvatar === 1 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar1} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(2)} className={`${selectedAvatar === 2 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar2} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(3)} className={`${selectedAvatar === 3 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar3} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(4)} className={`${selectedAvatar === 4 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar4} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(5)} className={`${selectedAvatar === 5 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar5} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(6)} className={`${selectedAvatar === 6 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar6} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(7)} className={`${selectedAvatar === 7 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar7} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedAvatar(8)} className={`${selectedAvatar === 8 && "avatar_selected"}`}>
          <div className="avatar_container">
            <img src={avatar8} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
