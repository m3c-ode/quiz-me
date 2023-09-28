// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const { generateRandomString } = require('./lib/helper-functions');
const { getUserInfo } = require('./db/queries/index');

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: [generateRandomString(10)],
    maxAge: 12 * 60 * 60 * 1000,
  })
);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(express.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const quizzesApiRoutes = require("./routes/quizzes-api");
const questionsApiRoutes = require("./routes/questions-api");
const attemptsApiRoutes = require("./routes/attempts-api");
const attemptAnswersApiRoutes = require("./routes/attempt_answers-api");
const usersRoutes = require("./routes/users");
const {
  authMiddleware,
  router: authRoutes,
} = require("./routes/authentication");
const attemptsRoutes = require("./routes/attempts");
const quizzesRoutes = require("./routes/quizzes");

// Mount all resource routes

// m3Note: use authMiddleware later to secure routes.
// app.use('/api/users', authMiddleware, userApiRoutes);
app.use("/api/users", userApiRoutes);
app.use("/api/quizzes", quizzesApiRoutes);
app.use("/api/questions", questionsApiRoutes);
app.use("/api/attempts", attemptsApiRoutes);
app.use("/api/attemptAnswers", attemptAnswersApiRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/attempts", attemptsRoutes);
app.use("/quizzes", quizzesRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  let user = req.session.user;
  if (!user.id) {
    user = undefined;
  }
  if (!req.session.user) {
    user = undefined;
  } else {
    user = req.session.user;
  }
  // Else: fetch the user info
  res.render("index", { user });
});

app.get('/login', (req, res) => {
  // TODO: Need to define the login form page here, instead of automatic redirect
  let user = req.session.user;
  if (!user.id) {
    userId = 1;
  }
  getUserInfo([userId])
    .then(data => {
      req.session.user = data[0];
      res.redirect("/");

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  // Else: fetch the user info
  // res.render('index', { user });
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
