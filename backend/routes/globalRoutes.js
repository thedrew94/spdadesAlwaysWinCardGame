const express = require("express");
const globalControllers = require("./../controllers/globalControllers");

module.exports = function (io) {
  const router = express.Router();
  router.get("/room", globalControllers.getAvailableRooms);
  router.get("/room/:roomID", globalControllers.getRoomByID);
  router.post("/room", (req, res, next) => globalControllers.joinRoomByID(req, res, next, io));
  router.post("/newRoom", globalControllers.newRoom);
  return router;
};
