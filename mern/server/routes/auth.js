const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require('crypto')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/require-login");
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const { SEND_GRID } = require("../config/keys");

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: SEND_GRID
  }
}))

router.get("/", (req, res) => {
  res.send("Welcome to the server for the Udemy MERN web application!");
});

router.post("/signup", (req, res) => {
  const { name, email, password, url } = req.body;
  if (!name || !email || !password) {
    res
      .status(422)
      .json({ error: "Please ensure you have filled up all the fields" });
  }
  // searches mongodb to check if email is used, else sign up
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "Email is already registered to another user!" });
      }
      // 10 is the salt
      bcrypt.hash(password, 10).then((hashedpassword) => {
        const user = new User({
          name,
          email,
          password: hashedpassword,
          displayPhoto: url
        });
        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.mail,
              from: "no-reply@dtjldamien.com",
              subject: "Welcome to Damien's Instagram Clone!",
              html: "<h1>Welcome to Damien's Instagram Clone!</h1>"
            })
            res.json({ message: "Signed up successfully!" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((error) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide your login credentials!" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email address!" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // id from mongodb, sign to ensure that it is the user
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following, displayPhoto } = savedUser;
          res.json({ token, user: { _id, name, email, followers, following, displayPhoto } });
        } else {
          return res.status(422).json({ error: "Invalid password!" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// only if user is signed in, require login will verify the token
router.get("/protected", requireLogin, (req, res) => {
  res.send("Hello User!");
});

router.post("/resetPassword", requireLogin, (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
  })
})

module.exports = router;
