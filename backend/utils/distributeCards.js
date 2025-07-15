const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
const suits = ["C", "D", "S", "H"];

// 52 cards
// prettier-ignore
const cards = [
  "1C", "1D", "1S", "1H",
  "2C", "2D", "2S", "2H",
  "3C", "3D", "3S", "3H",
  "4C", "4D", "4S", "4H",
  "5C", "5D", "5S", "5H",
  "6C", "6D", "6S", "6H",
  "7C", "7D", "7S", "7H",
  "8C", "8D", "8S", "8H",
  "9C", "9D", "9S", "9H",
  "10C", "10D", "10S", "10H",
  "11C", "11D", "11S", "11H",
  "12C", "12D", "12S", "12H",
  "13C", "13D", "13S", "13H"
]

// prettier-ignore
const cardsPlayers2 = [
  "1C", "1D", "1S", "1H",
  "2C", "2D", "2S", "2H",
  "3C", "3D", "3S", "3H",
  "4C", "4D", "4S", "4H",
  "5C", "5D", "5S", "5H",
  "6C", "6D", "6S", "6H",
  "7C", "7D", "7S", "7H",
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
