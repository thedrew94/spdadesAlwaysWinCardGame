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

export default function AvatarSelection({ formData = {}, setFormData = () => {} }) {
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
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 1 };
            })
          }
          className={`${formData.selectedAvatar === 1 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar1} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 2 };
            })
          }
          className={`${formData.selectedAvatar === 2 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar2} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 3 };
            })
          }
          className={`${formData.selectedAvatar === 3 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar3} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 4 };
            })
          }
          className={`${formData.selectedAvatar === 4 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar4} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 5 };
            })
          }
          className={`${formData.selectedAvatar === 5 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar5} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 6 };
            })
          }
          className={`${formData.selectedAvatar === 6 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar6} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 7 };
            })
          }
          className={`${formData.selectedAvatar === 7 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar7} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() =>
            setFormData((prev) => {
              return { ...prev, selectedAvatar: 8 };
            })
          }
          className={`${formData.selectedAvatar === 8 && "avatar_selected"}`}
        >
          <div className="avatar_container">
            <img src={avatar8} alt="" width="48px" height="48px" draggable="false" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
