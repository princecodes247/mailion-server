const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/user");
const Warp = require("../models/warp");
const sendWarpMail = require("../utils/sendWarpMail");
router.get("/:warpID", ensureAuthenticated, (req, res) => {
  //
  res.render("warp");
});

router.get("/create", ensureAuthenticated, (req, res) => {
  if (req.user.warps.length < 1) {
    let newWarp = true;

    let warpID = idGenerator(6);

    Warp.findOne({
      warpID,
    }).then((warp) => {
      if (!warp) {
        newWarp = false;
        let warpData = {
          warpID,
          userName: req.user.userName,
        };
        Warp.create(warpData);
      }
    });
  } //ADD else statement
});

//Change the request type
router.get("/:warpID/delete", ensureAuthenticated, (req, res) => {
  let warpID = req.query.warpID;
  Warp.deleteOne({ warpID }).then((warp) => {
    console.log(`${warp} dleted successfully`);
  });
});

router.get("/:warpID/settings", ensureAuthenticated, (req, res) => {
  res.render("warp_settings");
});

router.post("/:warpID", (req, res) => {
  //
  let warpID = req.query.warpID;
  let formData = { ...req.body };
  // Move auth to header
  if (req.body.auth) {
    Warp.findOne({
      warpID,
    })
      .then((warp) => {
        if (warp.messages.length < 20) {
          warp.messages.push({ formData });
          warp.save().then(() => {
            res.send({
              message: "Successful",
            });
          });
          if (warp.useMail == true) {
            sendWarpMail(req, warp);
          }
        }
      })
      .catch((err) => {
        res.send({
          message: "Unsuccessful",
          error: err,
        });
        return;
      });
  }
  //ADD else statement
});

module.exports = router;
