import express from "express";

const v2Router = express.Router();

v2Router.use("/v2", (req, res) => {
  res
    .status(200)
    .json({ message: "API v2 route working fine", status: "status" });
});

export default v2Router;
