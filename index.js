const PORT = process.env.PORT || 5000;

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKeys]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./rotues/authRoutes")(app);

mongoose.connect(keys.mongoUri);
app.listen(PORT);
