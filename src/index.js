const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const flash = require("connect-flash");
const session = require('express-session')
const MysqlStore = require('express-mysql-session')
const { connection } = require("./config/db");
const {database} =require('./config/keys')
const passport = require("passport");
const app = express();
require('./libs/passport')


//rutas
const events = require("./routes/events.routes");
const auth = require('./routes/auth.routes');


//Port
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(session({  //guardo la session en la base de datos para que funcione el flash
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: new MysqlStore(database)
}))
app.use(flash());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())


//global variables
app.use((req, res, next) => {  
  app.locals.succes = req.flash("succes");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//routes
app.use(events);
app.use(auth)
app.get('/', (req, res) => {
  res.redirect('/signin')
})

//public
app.use(express.static(path.join(__dirname, 'public')))


//server running
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
