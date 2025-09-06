import { useTranslation } from "react-i18next";
import FastAccessButton from "./FastAccessButton";

export default function RulesPage({ setPage }) {
  const { t } = useTranslation();

  return (
    <div className="game_btns_home">
      <div className="game_rules">
        <p>
          Each player starts with a random set of cards, with all players receiving an equal number of cards.
          <br /> <br />
          At the start of the game, each player examines their cards and makes a public prediction of how many hands
          they will win by the end of the game.
          <br /> <br />
          Players take turns playing one card per round. The highest card, from 2 to Ace (with Ace being the highest),
          wins the round and earns the player one point.
          <br /> <br />
          The player who accurately meets their predicted number of hand wins by the end of the game is declared the
          winner. Every player has the chance to win or lose.
          <br />
          <br />
          <strong>Game Rules:</strong>
          <br />
          - Players may play only one card per turn.
          <br /> <br />
          - Players must play a card of the same suit as the first card played in the round, if possible.
          <br /> <br />
          - If a player has no cards of the current suit, they may play any card from their hand.
          <br /> <br />
          - The player who won the previous round starts the next round.
          <br /> <br />
          - The highest card in the round wins, with Spades being the highest suit ( the other suits are all equal ). A
          Spade card always beats cards of other suits played in the same round.
          <br />
          In case of multiple Spade cards the highest one will win.
        </p>
      </div>
      <FastAccessButton
        btnText={t("btn_back")}
        btnSvg="back"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setPage(1);
        }}
      />
    </div>
  );
}
