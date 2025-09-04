const rooms = [];

const roomExample = {
  roomID: 123456,
  roomPlayers: [
    {
      socketID: "",
      playerUsername: "",
      playerAvatar: 1,
      playerTarget: 4,
      playerCurrentPoints: 1,
      playerCards: [],
      playerPlaying: false,
    },
  ],
  gameFieldCards: [{ playerSocket: "", card: "4C" }],
  roundWinningSuit: "C",
  roomMaxPlayers: 4,
  lastRoundData: { gameFieldCards: [{ playerSocket: "", card: "4C" }], playerWinner: "", winningCard: "4C" },
};

exports.getAllRooms = ({ filter = "" }) => {
  if (!filter) {
    return rooms;
  }
  if (filter === "roomID") {
    return rooms
      .filter((r) => r.roomPlayers.length < r.roomMaxPlayers)
      .map((r) => {
        return { ...r, roomPlayers: r.roomPlayers.length };
      });
  }
};

exports.getRoom = ({ roomID = "" }) => {
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  return rooms[roomIdx];
};

exports.addRoom = (room) => {
  rooms.push(room);
};

exports.addPlayerToRoom = ({ roomID = "", playerData = {} }) => {
  if (!roomID || Object.keys(playerData).length === 0)
    return { status: "fail", message: "Invalid room id or invalid player data" };
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }
  const roomData = rooms[roomIdx];
  if (roomData.roomPlayers.length >= roomData.roomMaxPlayers) {
    return { status: "fail", message: "Room is full" };
  }
  roomData.roomPlayers.push(playerData);
  return { status: "success", data: roomData };
};

exports.updateRoomPlayersData = ({ roomID = null, playersData = [] }) => {
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }
  rooms[roomIdx].roomPlayers = playersData;
  return {
    status: "success",
    data: rooms[roomIdx],
  };
};

exports.updateSinglePlayerData = ({ roomID = null, playerData = null }) => {
  if (!roomID || !playerData) {
    return { status: "fail", message: "Invalid room id or invalid player data" };
  }
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }

  const player = rooms[roomIdx].roomPlayers.find((p) => p.socketID === playerData.socketID);
  player.playerTarget = playerData.targetPoints;

  return {
    status: "success",
    data: rooms[roomIdx],
  };
};

exports.updateRoomGameCards = ({ roomID = null, cardData = null }) => {
  // cardData = { socketID: socket.id, cardData }

  if (!roomID || !cardData) {
    return { status: "fail", message: "Invalid room id or invalid player data" };
  }
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }

  rooms[roomIdx].gameFieldCards = [...rooms[roomIdx].gameFieldCards, cardData];

  // Find the index of the current player (who played the card) based on socketID
  const currentPlayerIndex = rooms[roomIdx].roomPlayers.findIndex(
    (player) => player.socketID === cardData.playerSocket
  );

  rooms[roomIdx].roomPlayers.forEach((player) => {
    player.playerPlaying = false;
  });

  const nextPlayerIndex =
    currentPlayerIndex >= 0 && currentPlayerIndex < rooms[roomIdx].roomPlayers.length - 1 ? currentPlayerIndex + 1 : 0;

  rooms[roomIdx].roomPlayers[nextPlayerIndex].playerPlaying = true;

  const { playerSocket, card } = cardData;
  const [cardValue, cardSuit] = [card.slice(0, -1), card.slice(-1)];
  const formattedCard = `${cardSuit}_${cardValue}`;
  const player = rooms[roomIdx].roomPlayers.find((p) => p.socketID === playerSocket);
  player.playerCards = player.playerCards.filter((c) => c !== formattedCard);

  return {
    status: "success",
    data: rooms[roomIdx],
  };
};

exports.deleteRoom = ({ roomID = null }) => {
  if (!roomID) {
    return { status: "fail", message: "Missing or invalid roomID" };
  }
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }
  rooms.splice(roomIdx, 1);
  return { status: "success", message: "Room was deleted successfully" };
};

exports.updateRoundWinningSuit = ({ roomID = null, cardSuit = null }) => {
  if (!roomID || !cardSuit) {
    return { status: "fail", message: "Missing or invalid roomID" };
  }
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }
  rooms[roomIdx].roundWinningSuit = cardSuit;

  return {
    status: "success",
    message: "Room suit updated successfully",
    data: cardSuit,
  };
};

exports.endRound = ({ roomID = null, cardData }) => {
  if (!roomID) {
    return { status: "fail", message: "Missing or invalid roomID" };
  }
  const roomIdx = rooms.findIndex((r) => r.roomID === roomID);
  if (roomIdx === -1) {
    return { status: "fail", message: "No room was found for the provided room id" };
  }

  const room = rooms[roomIdx];
  const { gameFieldCards, roundWinningSuit, roomPlayers } = room;

  // Determine the winning card
  let winningCard = null;
  let playerWinner = "";
  let highestValue = -1;

  gameFieldCards.forEach(({ playerSocket, card }) => {
    const suit = card.slice(-1); // Get the suit (last character)
    const value = parseInt(card.slice(0, -1)); // Get the card number

    // Check if card is a Spade (trump suit) or matches the roundWinningSuit
    const isTrump = suit === "S";
    const isValidSuit = isTrump || suit === roundWinningSuit;

    if (isValidSuit) {
      // Spades always win over other suits
      const cardRank = isTrump ? value + 100 : value; // Give Spades a higher rank
      if (cardRank > highestValue) {
        highestValue = cardRank;
        winningCard = card;
        playerWinner = playerSocket;
      }
    }
  });

  // Increment the winner's playerCurrentPoints
  if (playerWinner) {
    const winner = roomPlayers.find((player) => player.socketID === playerWinner);
    if (winner) {
      winner.playerCurrentPoints += 1;
    }
  }

  room.lastRoundData = {
    gameFieldCards: [...gameFieldCards],
    playerWinner,
    winningCard,
  };

  room.gameFieldCards = [];
  room.roundWinningSuit = "I";

  // Find current player with playerPlaying: true
  const currentPlayerIdx = roomPlayers.findIndex((player) => player.playerPlaying === true);

  // Set all players' playerPlaying to false
  roomPlayers.forEach((player) => {
    player.playerPlaying = false;
  });

  // Set the playing player to the player who won the round
  const winningPlayer = roomPlayers.findIndex((p) => p.socketID === playerWinner);
  roomPlayers[winningPlayer].playerPlaying = true;

  const { playerSocket, card } = cardData;
  const [cardValue, cardSuit] = [card.slice(0, -1), card.slice(-1)];
  const formattedCard = `${cardSuit}_${cardValue}`;
  const player = rooms[roomIdx].roomPlayers.find((p) => p.socketID === playerSocket);
  player.playerCards = player.playerCards.filter((c) => c !== formattedCard);

  return {
    status: "success",
    message: "Round ended successfully",
    data: room,
  };
};
