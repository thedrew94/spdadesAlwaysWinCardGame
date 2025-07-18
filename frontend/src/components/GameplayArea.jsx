import { renderCard } from "../utils/renderCard";

function reconstructCard(card) {
  const letter = card.slice(-1);
  const number = card.slice(0, -1);
  return `${letter}_${number}`;
}

export default function GameplayArea({ userData }) {
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
      <div className="gameplayarea_cards">
        {userData?.gameFieldCards?.map((c, idx) => {
          return (
            <div key={`played_card_${idx}`} className="gameplayarea_card">
              {renderCard({ cardName: reconstructCard(c.card) })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
