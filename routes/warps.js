const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../config/auth");

router.get("/:warpname", (req, res) => {
  //
  res.render("warp");
});

router.get("/settings", (req, res) => {
  res.render("warp_settings");
});

router.post(":username/create", (req, res) => {
  //Finish this
  let newWarp = true;
  while (newWarp) {
    let warpID = idGenerator(6);
    Warp.findOne({
      warpID,
    }).then((warp) => {
      if (!warp) {
        newWarp = false;
        console.log("not found");
      }
    });
    console.log(warpID);
  }

  let warpData = {
    warpID,
  };
  Warp.create(warpData);
});

router.post("/:warpID", (req, res) => {
  //
  let formData = { ...req.body };
  Warp.findOne({
    warpID,
  })
    .then((warp) => {
      warp.messages.push({ formData });
      res.send({
        message: "Successful",
      });
    })
    .catch((err) => {
      res.send({
        message: "Successful",
        error: err,
      });
      return;
    });
});

module.exports = router;
