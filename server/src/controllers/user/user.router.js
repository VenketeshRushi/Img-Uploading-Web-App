const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.send("These are the users");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(500)
        .json({ status: "failed", message: "Please check your email" });
    }
 
    const match = await user.checkPassword(password);

    if (!match) {
      return res
        .status(500)
        .json({ status: "failed", message: "Please check your password" });
    }

    const token = jwt.sign({ user }, "1234", { expiresIn: "30 min" });

    let now = new Date();
    let minutes = 30;
    now.setTime(now.getTime() + minutes * 60 * 1000);

    res.cookie("jwttoken", token, {
      maxAge: 100000,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).send({ jwttoken: token, userid: user._id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  let { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(500)
        .json({ status: "Failed", message: "Please try with different email" });
    }
    user = await User.create(req.body);
    console.log(user);
    return res.status(201).send("Signed in successfully");
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = app;
