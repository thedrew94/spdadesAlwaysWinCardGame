const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
const suits = ["C", "D", "S", "H"];

// 52 cards
// prettier-ignore
const cards = [
  "C_15", "D_15", "S_15", "H_15",
  "C_2", "D_2", "S_2", "H_2",
  "C_3", "D_3", "S_3", "H_3",
  "C_4", "D_4", "S_4", "H_4",
  "C_5", "D_5", "S_5", "H_5",
  "C_6", "D_6", "S_6", "H_6",
  "C_7", "D_7", "S_7", "H_7",
  "C_8", "D_8", "S_8", "H_8",
  "C_9", "D_9", "S_9", "H_9",
  "C_10", "D_10", "S_10", "H_10",
  "C_11", "D_11", "S_11", "H_11",
  "C_12", "D_12", "S_12", "H_12",
  "C_13", "D_13", "S_13", "H_13"
]

// prettier-ignore
const cardsPlayers2 = [
  "C_15", "D_15", "S_15", "H_15",
  "C_2", "D_2", "S_2", "H_2",
  "C_3", "D_3", "S_3", "H_3",
  "C_4", "D_4", "S_4", "H_4",
  "C_5", "D_5", "S_5", "H_5",
  "C_6", "D_6", "S_6", "H_6",
  "C_7", "D_7", "S_7", "H_7",
]

exports.distributeCards = ({ numbPlayers = 2 }) => {
  if (numbPlayers === 2) {
    const totalCards = cardsPlayers2.length;
    const cardsPerPlayer = Math.floor(totalCards / numbPlayers);

    // Shuffle cards (Fisher-Yates algorithm)
    const shuffledCards = [...cardsPlayers2];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    // Distribute cards to players
    const playersHands = Array.from({ length: numbPlayers }, () => []);
    for (let i = 0; i < shuffledCards.length; i++) {
      playersHands[i % numbPlayers].push(shuffledCards[i]);
    }

    return playersHands;
  }
  return;
};
