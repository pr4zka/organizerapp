const express = require("express");
const router = express.Router();
const controller = require("../controllers/event");
const { isLoggedIn } = require("../libs/auth");

router.get("/events", isLoggedIn, controller.add);
router.get("/delete/:id", isLoggedIn, controller.delete);
router.get("/edit/:id", isLoggedIn, controller.edit);
router.post("/edit/:id", isLoggedIn, controller.editt);
router.post("/events", isLoggedIn, controller.addd);
router.get("/events/list", isLoggedIn, controller.list);

module.exports = router;
