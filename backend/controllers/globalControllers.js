// @GET /api/getData
exports.getData = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    data: {},
  });
};
