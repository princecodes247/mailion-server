const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../config/auth");

router.get("/:warpname", (req, res) => {
  //
});

router.post("/create", ensureAuthenticated, (req, res) => {
  //Finish this
  let warp = {
    warpName: "hi",
  };
  Warp.create(warp);
});

router.post("/:warpname", (req, res) => {
  //
  let formData = { ...req.body };
  Warp.findOne({
    warpID,
  })
    .then((warp) => {
      warp.messages.push(formData);
    })
    .catch((err) => {
      res.send({ error: err });
      return;
    });
});

module.exports = router;
