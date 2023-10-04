const express = require('express');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  console.log("🚀 ~ file: authentication.js:5 ~ authMiddleware ~ req.cookie:", req.cookie);
  console.log("🚀 ~ file: authentication.js:5 ~ authMiddleware ~ req.cookies:", req.cookies);
  console.log("🚀 ~ file: authentication.js:5 ~ authMiddleware ~ req.session:", req.session);
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const authRedirectMiddleware = (req, res, next) => {
  //TODO:  Redirect to /login when ready
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
};

router.get("/login/:id", (req, res) => {
  console.log("🚀 ~ file: authentication.js:21 ~ session pre-assignment:", req.session);
  req.session.user.id = req.params.id;
  console.log("🚀 ~ file: authentication.js:23 ~ router.get ~ req.session:", req.session);
  res.redirect('/');
});

// Implement register route as a stretch?

module.exports = { router, authMiddleware, authRedirectMiddleware };