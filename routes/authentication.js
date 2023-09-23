const express = require('express');
const router = express.Router();

router.get("/login/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

// Implement register route as a stretch?

module.exports = router;