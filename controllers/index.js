const router = require("express").Router();

const apiRoutes = require("./api");
const homepageRoutes = require("./homepRoutes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;