const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require("./models/CrudApp");

const port = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8tihy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Created new user
app.post("/insert", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const user = new UserModel({
    userFirstName: firstName,
    userLastName: lastName,
    userName: userName,
    userEmail: email,
    userPassword: password,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
});

// Show all users
app.get("/read", async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

// Show specific users who want to update his information
app.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Update specific users information
app.put("/:id", async (req, res) => {
  console.log(res);
  let user = await UserModel.findById(req.params.id);
  user = req.body;

  const editUser = new UserModel(user);
  try {
    await UserModel.updateOne({ _id: req.params.id }, editUser);
    res.json(editUser);
  } catch (err) {
    res.json(err);
  }
});

// Delete specific users
app.delete("/:id", async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.json("User deleted Successfully");
  } catch (err) {
    res.json(err);
  }
});
app.listen(process.env.PORT || port);
