const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyAuth = require("../Middlewares/verifyJwt");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

//Route1: Create a new user

Router.post(
  "/register",
  [
    body("email", "Enter a valid email..!").isEmail(),
    body("password", "Min 6 characters are reqiured in password..!").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // req validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
      }

      const { name, email, password } = req.body;

      const duplicateUser = await User.findOne({ email: req.body.email });
      if (duplicateUser) {
        return res.json({ success: false, msg: `Email already exists` });
      } else {
        const salt = await bcrypt.genSalt(10);
        var hashedPwd = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPwd });
        res.json({ success: true, user });
      }
    } catch {
      //Internal server error
      res.sendStatus(500);
    }
  }
);

//Route2: User Login

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      success: false,
      msg: "Username and password are required",
    });

  const user = await User.findOne({ email });
  if (user) {
    //hashed pwd matching with user given pwd

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) {
      return res.json({
        success: false,
        msg: "Please provide a valid password",
      });
    }

    jwt.sign(
      { user },
      process.env.secretKey,
      { expiresIn: "7d" },
      (err, token) => {
        err
          ? res.json({
            success: false,
            msg: "An error occured please try after some time.",
          })
          : res.json({ success: true, user, token });
      }
    );
  } else {
    res.json({ success: false, msg: "No such user found" });
  }
});

//Route3: User CRUD operations using userid in params

Router.route("/getCurrentUser/:id")
  .get(verifyAuth, async (req, res) => {
    try {
      const foundUser = await User.find({ _id: req.params.id }).select(
        "-password"
      );
      foundUser
        ? res.json({ success: true, foundUser })
        : res.json({ success: false, msg: "No user found" });
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        const result = await User.deleteOne({ _id: req.params.id });
        res.json({ success: true, result, msg: `User deleted` });
      } else {
        res.json({ success: false, msg: `No such user exists` });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .put(
    [
      body("email", "Enter a valid email..!").isEmail(),
      body("password", "Min 6 characters are reqiured in password..!").isLength(
        {
          min: 6,
        }
      ),
    ],
    async (req, res) => {
      try {
        // req validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({ success: false, errors: errors.array() });
        }

        const user = await User.findOne({ _id: req.params.id });
        if (user) {
          const result = await User.updateOne(
            { _id: req.params.id },
            { $set: req.body }
          );
          const { name } = req.body;
          res.json({ success: true, result, msg: `User details updated..!` });
        } else {
          res.json({ success: false, msg: `No such user exists..!` });
        }
      } catch (error) {
        res.sendStatus(500);
      }
    }
  );

module.exports = Router;
