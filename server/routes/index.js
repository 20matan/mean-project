const express = require("express");
const heroRouter = require("./heroRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const mapRouter = require("./mapRouter");

const router = express.Router();
router.use("/hero", heroRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/map", mapRouter);

router.use((err, req, res, next) => {
  console.error("err", err.message);
  res.status(500).send(err.message);
});

module.exports = router;
