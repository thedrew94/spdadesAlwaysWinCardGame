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
  gameFieldCards: [],
  roundWinningSuit: null,
  roomMaxPlayers: 4,
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
