import s4 from "../assets/4S_test.png";

export default function GameplayArea() {
  return (
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
  );
}
