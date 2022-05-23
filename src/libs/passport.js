const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../config/db");
const { encryp, compare } = require("../libs/handlePass");

//iniciar session
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE email = ?", [username]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await compare(password, user.password);
        if (validPassword) {
          done(null, user, req.flash("succes" + user.username));
        } else {
          done(null, false, req.flash('message','Datos ingresados no son correctos'));
        }
      }else{
        return done(null, false, req.flash('message','El usuario no existe') )
      }
    }));

//crear usuario
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, name, password, done) => {
      try {
        const hashedPassword = await encryp(req.body.password);
        const { email, birthday } = req.body;
        const newUser = {
          name,
          email: email,
          birthday: birthday,
          password: hashedPassword,
        };
        const result = await pool.query("INSERT INTO users set ?", [newUser]);
        newUser.id = result.insertId;
        //almaceno el user en una session
        return done(null, newUser);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users Where id = ?", [id]);
  done(null, rows[0]);
});
