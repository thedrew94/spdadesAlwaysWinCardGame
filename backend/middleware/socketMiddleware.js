const {
  getRoom,
  getAllRooms,
  addRoom,
  addPlayerToRoom,
  updateSinglePlayerData,
} = require("./../controllers/roomsController");

exports.setPlayerTargetPoints = (io, socket, data) => {
  const roomData = updateSinglePlayerData({ roomID: data.roomID, playerData: data });

  roomData.data.roomPlayers.forEach((player) => {
    io.to(player.socketID).emit("waitPlayerTargetPoints", {
      status: "success",
      message: "Awaiting other players to set their target points",
      data: roomData.data,
    });
  });
};
