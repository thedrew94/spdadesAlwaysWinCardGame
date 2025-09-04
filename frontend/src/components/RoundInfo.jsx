import bg from "../assets/playing_card_256.png";

export default function RoundInfo() {
  return (
    <div className="homepage_title">
      <span className="title_main_letter">S</span>
      <div className="title_side_letter">
        <span>pades</span>
        <span>always wins</span>
      </div>
      <img src={bg} alt="Main app logo bg" width="256px" height="256px" draggable="false" />
    </div>
  );
}
