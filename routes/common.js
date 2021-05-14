const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/docs", (req, res) => {
  res.json("docs");
});

router.get("/warp", (req, res) => {
  res.render("warp");
});
router.get("/settings", (req, res) => {
  res.render("settings");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
//FIX THESE ROUTES
// router.get("/faq", (req, res) => {
//   res.render("faq");
// });

module.exports = router;
