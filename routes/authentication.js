const express = require('express');
const router = express.Router();

const authMiddleware = (req, res, next) => {
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