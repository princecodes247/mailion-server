const express = require("express");
const router = express.Router();
const sendWarpMail = require("../utils/sendWarpMail");

router.get("/a", (req, res) => {
  sendWarpMail(req, { warpID: 1, messages: [] });
  res.render("home");
});
router.get("/docs", (req, res) => {
  res.render("docs");
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
