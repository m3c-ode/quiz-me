const express = require('express');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

router.get("/login/:id", (req, res) => {
  req.session.userId = req.params.id;
  res.redirect('/');
});

// Implement register route as a stretch?

module.exports = { router, authMiddleware };