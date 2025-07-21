const { distributeCards } = require("../utils/distributeCards");
// prettier-ignore
const { getRoom, getAllRooms, addRoom, addPlayerToRoom, updateRoomPlayersData, deleteRoom } = require("./roomsController");

// @POST /api/getData
exports.newRoom = async (req, res, next) => {
  const socketID = req.body.socketID;
  const username = req.body.username;
  const playerCount = req.body.playerCount;
  const selectedAvatar = req.body.selectedAvatar;

  function generateRoomId(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Check for uniqueness
    // if (rooms.some((room) => room.id === result)) {
    //   return generateRoomId(length); // Recursively try again if ID exists
    // }
    return result;
  }

  const newRoom = {
    roomID: generateRoomId(),
    roomPlayers: [
      {
        socketID,
        playerUsername: username,
        playerAvatar: selectedAvatar,
        playerTarget: null,
        playerCurrentPoints: null,
        playerCards: [],
        playerPlaying: false,
      },
    ],
    gameFieldCards: [],
    roundWinningSuit: null,
    roomMaxPlayers: playerCount,
    lastRoundData: {},
  };

  addRoom(newRoom);
  res.status(200).json({
    status: "success",
    message: "Room created successfully",
    data: newRoom,
  });
};

// @POST /api/room
exports.joinRoomByID = async (req, res, next, io) => {
  const roomID = req.body.roomID;
  const socketID = req.body.socketID;
  const username = req.body.username;
  const selectedAvatar = req.body.selectedAvatar;

  const roomData = addPlayerToRoom({
    roomID,
    playerData: {
      socketID,
      playerUsername: username,
      playerAvatar: selectedAvatar,
      playerTarget: null,
      playerCurrentPoints: null,
      playerCards: [],
      playerPlaying: false,
    },
  });

  if (roomData.status !== "success") {
    return res.status(400).json({
      status: roomData.status,
      message: roomData.message,
      data: null,
    });
  }

  if (roomData.data.roomPlayers.length === roomData.data.roomMaxPlayers) {
    const playersCardsData = distributeCards({ numbPlayers: roomData.data.roomMaxPlayers });
    const updatedPlayersData = roomData.data.roomPlayers.map((p, idx) => {
      return { ...p, playerCards: playersCardsData[idx] };
    });

    const updatedRoomData = updateRoomPlayersData({ roomID, playersData: updatedPlayersData });

    if (updatedRoomData.status !== "success") {
      return res.status(400).json({
        status: updatedRoomData.status,
        message: updatedRoomData.message,
        data: null,
      });
    }

    // TODO: TO EACH PLAYER ONLY RETURN THEIR OWN CARDS AND NOT EVERYBODY CARDS
    roomData.data.roomPlayers.forEach((player) => {
      io.to(player.socketID).emit("gameStart", {
        status: "success",
        message: "Game started successfully",
        data: updatedRoomData.data,
      });
    });
    return res.status(200).json({
      status: "success",
      message: "Room data fetched successfully",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Room data fetched successfully",
    data: roomData.data,
  });
};

// @GET /api/room
exports.getAvailableRooms = async (req, res, next) => {
  const roomsData = getAllRooms({ filter: "roomID" });
  res.status(200).json({
    status: "success",
    message: "Rooms data fetched successfully",
    data: roomsData,
  });
};

// @GET /api/room/:roomID
exports.getRoomByID = async (req, res, next) => {
  const { roomID } = req.params;
  const room = getRoom({ roomID });
  res.status(200).json({
    status: "success",
    message: "Room data fetched successfully",
    data: room,
  });
};

// @DELETE /api/room/:roomID
exports.deleteRoomByID = async (req, res, next) => {
  const { roomID } = req.body;

  if (!roomID) {
    return res.status(400).json({
      status: "fail",
      message: "Missing roomID",
      data: null,
    });
  }

  const roomData = deleteRoom({ roomID });
  if (roomData.status === "success") {
    res.status(200).json({
      status: "success",
      message: "Room deleted successfully",
      data: null,
    });
  } else {
    return res.status(400).json({
      status: roomData.status,
      message: roomData.message,
      data: null,
    });
  }
};
