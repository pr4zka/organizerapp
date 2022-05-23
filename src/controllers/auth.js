const passport = require("passport");
const controllers = {};

controllers.getAuth = (req, res) => {
  res.render("users");
};

//crear usuario
controllers.getProfile = (req, res) => {
  res.render("profile");
};

//cerrar sesion
controllers.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("signin");
  });
};


//vista usuario
controllers.signin = (req, res) => {
  res.render("auth/signin");
};

controllers.signinn = (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
};

module.exports = controllers;
