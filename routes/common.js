const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
//FIX THESE ROUTES
// router.get("/faq", (req, res) => {
//   res.render("faq");
// });

module.exports = router;
