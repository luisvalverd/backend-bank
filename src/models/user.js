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
  last_name: {
    type: String,
    unique: false,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  money: {
    type: Number,
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
  deposit_resived: [
    {
      email_user_resived: {
        type: String,
        require: true,
      },
      name_user_resived: {
        type: String,
        require: true,
      },
      lastname_user_resived: {
        type: String,
        require: true,
      },
      money_user_resived: {
        type: Number,
        require: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  deposits_made: [
    {
      email_user: {
        type: String,
        require: true,
        unique: false,
      },
      name_user: {
        type: String,
        require: true,
        unique: false
      },
      lastname_user: {
        type: String,
        require: true,
        unique: false,
      },
      money_send: {
        type: Number,
        require: true,
        unique: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = model("User", User);
