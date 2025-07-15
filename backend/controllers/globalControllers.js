const { distributeCards } = require("../utils/distributeCards");
const { getRoom, getAllRooms, addRoom, addPlayerToRoom } = require("./roomsController");

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
    roomPlayers: [{ socketID, playerUsername: username, playerAvatar: selectedAvatar }],
    roomMaxPlayers: playerCount,
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
    playerData: { socketID, playerUsername: username, playerAvatar: selectedAvatar },
  });

  if (roomData.status !== "success") {
    return res.status(400).json({
      status: roomData.status,
      message: roomData.message,
      data: null,
    });
  }

  if (roomData.data.roomPlayers.length === roomData.data.roomMaxPlayers) {
    // generate cards and distribute cards to the players
    const playersCardsData = distributeCards({ numbPlayers: roomData.data.roomMaxPlayers });
    // add cards to each player and send all the data to the client to populate the globalprovider
    //   const newRoom = {
    //     roomID: generateRoomId(),
    //     roomPlayers: [{ socketID: "", playerUsername: username, playerAvatar:
    //     selectedAvatar }],
    //     roomMaxPlayers: playerCount,
    //   };
    roomData.data.roomPlayers.forEach((player) => {
      io.to(player.socketID).emit("gameStart", {
        status: "success",
        message: "Game started successfully",
        data: playersCardsData,
      });
    });
    return;
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
