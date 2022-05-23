const express = require("express");
const router = express.Router();
const passport = require("passport");
const controllers = require("../controllers/auth");
const { isLoggedIn } = require("../libs/auth");

router.get("/signup", controllers.getAuth);

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);
router.get("/signin", controllers.signin);

router.get("/profile", isLoggedIn, controllers.getProfile);

router.post("/signin", controllers.signinn);

router.get("/logout", controllers.logout);

module.exports = router;
