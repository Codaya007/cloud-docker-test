const express = require("express");
const pronosticRouter = require("./pronostic.routes");
const weatherDataRouter = require("./weatherData.routes");
const nodeRouter = require("./node.routes");
const rolRouter = require("./rol.routes");
const accountRouter = require("./account.routes");
const authRouter = require("./auth.routes");
const imageRouter = require("./image.routes");
const sensorRouter = require("./sensor.routes");
const weatherConditionsRouter = require("./weatherCondition.routes");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.render("index", { title: "Express" });
  return res.json({ message: "Hola mundo" });
});

router.use("/auth", authRouter);
router.use("/weatherconditions", weatherConditionsRouter);
router.use("/pronostics", pronosticRouter);
router.use("/weatherdatas", weatherDataRouter);
router.use("/nodes", nodeRouter);
router.use("/roles", rolRouter);
router.use("/accounts", accountRouter);
router.use("/images", imageRouter);
router.use("/sensors", sensorRouter);

module.exports = router;
