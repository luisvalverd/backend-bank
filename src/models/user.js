const { Schema, model } = require("mongoose");

const User = new Schema({
  id: {
    type: Number,
    unique: true,
    require: true,
  },
  firts_name: {
    type: String,
    unique: false,
    require: true,
  },
  lsat_name: {
    type: String,
    unique: false,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  ip_address: {
    type: String,
    unique: true,
    require: false,
  },
  money: {
    type: String,
    unique: false,
    require: true,
  },
  type_credit_card: {
    type: String,
    unique: false,
    require: false,
  },
  credit_card: {
    type: String,
    unique: true,
    require: false,
  },
  password: {
    type: String,
    unique: false,
    require: true,
  },
  gender: {
    type: String,
    unique: false,
    require: true,
  },
});

module.exports = model("User", User);
