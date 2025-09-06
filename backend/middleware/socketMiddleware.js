const {
  updateSinglePlayerData,
  updateRoomGameCards,
  updateRoundWinningSuit,
  endRound,
} = require("./../controllers/roomsController");

exports.setPlayerTargetPoints = (io, socket, data) => {
  const roomData = updateSinglePlayerData({ roomID: data.roomID, playerData: data });
  const hasInvalidPlayerTarget = roomData.data.roomPlayers.some(
    (p) => p.playerTarget === null || p.playerTarget === undefined
  );
  if (hasInvalidPlayerTarget) {
    roomData.data.roomPlayers.forEach((player) => {
      io.to(player.socketID).emit("waitPlayerTargetPoints", {
        status: "success",
        message: "Awaiting other players to set their target points",
        data: roomData.data,
      });
    });
  } else {
    const randomIndex = Math.floor(Math.random() * roomData.data.roomPlayers.length);
    roomData.data.roomPlayers[randomIndex].playerPlaying = true;
    roomData.data.roomPlayers.forEach((player) => {
      io.to(player.socketID).emit("gameCanStart", {
        status: "success",
        message: "Game started",
        data: roomData.data,
      });
    });
  }
};

exports.playCard = (io, socket, data) => {
  // { roomID: userData.roomID, socketID: socket.id, cardData }

  const updatedRoomData = updateRoomGameCards({
    roomID: data.roomID,
    cardData: { playerSocket: data.socketID, card: data.cardData },
  });

  const allPlayersNoCards = updatedRoomData.data.roomPlayers.every((player) => player.playerCards.length === 0);

  if (updatedRoomData.data.gameFieldCards.length === updatedRoomData.data.roomMaxPlayers) {
    const endRoundData = endRound({
      roomID: data.roomID,
      cardData: { playerSocket: data.socketID, card: data.cardData },
    });
    if (allPlayersNoCards) {
      updatedRoomData.data.roomPlayers.forEach((player) => {
        io.to(player.socketID).emit("gameEnd", {
          status: "success",
          message: "Game ended",
          data: updatedRoomData,
        });
      });
      return;
    }
    updatedRoomData.data.roomPlayers.forEach((player) => {
      io.to(player.socketID).emit("roundEnd", {
        status: "success",
        message: "Round ended",
        data: endRoundData.data,
      });
    });
    return;
  }

  let roomWinnigSuit;
  if (updatedRoomData.data.gameFieldCards.length === 1) {
    roomWinnigSuit = updateRoundWinningSuit({ roomID: data.roomID, cardSuit: data.cardData.slice(-1) });
  }

  updatedRoomData.data.roomPlayers.forEach((player) => {
    io.to(player.socketID).emit("newCardPlayed", {
      status: "success",
      message: "A player played a card",
      data: {
        ...updatedRoomData.data,
        roundWinningSuit: roomWinnigSuit ? roomWinnigSuit.data : updatedRoomData.data.roundWinningSuit,
      },
    });
  });
};

exports.handleDisconnection = (io, socket) => {
  console.log("io", socket.id);
};
