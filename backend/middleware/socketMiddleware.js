const { updateSinglePlayerData, updateRoomGameCards } = require("./../controllers/roomsController");

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
  // roomID: userData.roomID, socketID: socket.id, cardData });
  const updatedRoomData = updateRoomGameCards({
    roomID: data.roomID,
    cardData: { playerSocket: data.socketID, card: data.cardData },
  });

  updatedRoomData.data.roomPlayers.forEach((player) => {
    io.to(player.socketID).emit("newCardPlayed", {
      status: "success",
      message: "A player played a card",
      data: updatedRoomData.data,
    });
  });
};
