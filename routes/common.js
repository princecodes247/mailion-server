const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/docs", (req, res) => {
  res.json("docs");
});

router.get("/404", (req, res) => {
  res.render("docs");
});

router.get("/confirm-email", (req, res) => {
  res.render("confirm-email");
});

//FIX THESE ROUTES
// router.get("/faq", (req, res) => {
//   res.render("faq");
// });

module.exports = router;
