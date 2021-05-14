const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const sendResetCode = require("../utils/sendResetCode");
const sendActivationMail = require("../utils/sendActivationMail");
const idGenerator = require("../utils/idGenerator");
const User = require("../models/user");
const Warp = require("../models/warp");
const passport = require("passport");
const ensureAuthenticated = require("../config/auth");

router.get("/admin", (req, res, next) => {
  if (req.user.level == 2) {
    User.find().then((result) => {
      let temp = ({ userName, email, dateCreated, warps, status } = result);
      res.render("admin", {
        users: temp,
      });
    });
    next();
  }
  res.redirect("/dashboard");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login", { error: { type: "none" } });
});
router.get("/dashboard", (req, res) => {
  let user = { password, ...req.user };

  res.render("dashboard", { user });
});

router.get("/warp/create", (req, res) => {
  // while (true) {
  let warpID = idGenerator(6);
  Warp.findOne({
    warpID,
  }).then((warp) => {
    if (!warp) {
      //return id;
      console.log("not found");
    }
  });
  //}

  let warpData = {
    warpID,
  };
});
// Register User
router.post("/register", (req, res) => {
  let { firstName, lastName, email, password, password2 } = req.body;
  userName = firstName.toString().trim();
  email = email.toString().trim();
  password = password.toString().trim();
  password2 = password2.toString().trim();
  let userData = {
    userName,
    email,
    password,
    password2,
    plan: 0,
    level: 0,
    warps: [],
  };
  User.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        if (password == password2) {
          bcrypt.hash(password, 10, (err, hash) => {
            userData.password = hash;
            User.create(userData)
              .then((user) => {
                console.log("User Registered");
                sendActivationMail(req, user);
                res.render("confirm-email");
              })
              .catch((err) => {
                console.log({ err });
                return;
              });
          });
        } else {
          res.json({ error: "Password do not match" });
        }
      } else {
        res.json({ error: "The provided email is registered already" });
        return;
      }
    })
    .catch((err) => {
      res.send({ error: err });
      return;
    });
});

// Login User
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
