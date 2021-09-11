const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userFirstName: {
    type: String,
    require: true,
  },
  userLastName: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
});

const CrudApp = mongoose.model("users", userSchema);
module.exports = CrudApp;
