const express = require("express");
const router = express.Router();
const cors = require("cors")
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/user");
const Warp = require("../models/warp");
const sendWarpMail = require("../utils/sendWarpMail");
const idGenerator = require("../utils/idGenerator");

router.get("/view/:warpID", ensureAuthenticated, (req, res) => {
  //
  res.render("warp");
});

router.get("/create", ensureAuthenticated, (req, res) => {
  if (req.user.warps.length < 2) {
    let newWarp = true;

    let warpID = idGenerator(6);

    Warp.findOne({
      warpID,
    }).then((warp) => {
      if (!warp) {
        newWarp = false;
        req.user.warps.push(warpID)
        let warpData = {
          warpID,
          userName: req.user.userName,
        };
        Warp.create(warpData).then(()=>{
          console.log("warp created");
          res.json("warp created")
        }).catch(err=>{
          console.log(err);
        })
      }
    });
  } //ADD else statement
});

//Change the request type
router.get("/delete/:warpID", ensureAuthenticated, (req, res) => {
  let warpID = req.query.warpID;
  Warp.deleteOne({ warpID }).then((warp) => {
    console.log(`${warp} deleted successfully`);
  });
});

router.get("/settings/:warpID", ensureAuthenticated, (req, res) => {
  res.render("warp_settings");
});

router.post("/send/:warpID", (req, res) => {
  //
  

  let warpID = req.params.warpID;
  let formData = { ...req.body };
  // Move auth to header
  
  if (true) {
    Warp.findOne({
      warpID,
    })
      .then((warp) => {
        
        if (warp.messages.length < 100) {
          warp.messages.push({ formData });
          warp.save().then(() => {
            res.json({
              message: "Successful",
            });
          });
          if (warp.useMail == true) {
            sendWarpMail(req, warp);
          }
        }else {
          res.json("Warp limit exceeded")
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
