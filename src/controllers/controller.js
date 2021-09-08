const User = require("../models/user");

// if id exits find a new number ramdom
// else id no exits in databse create a new user using that id
function compareIds(id) {
  await User.findOne({ id }, (err, user) => {
    try {
      if (user) {
        console.log("user exits");
        compareIds(Math.floor(Math.random() * 10000));
      }
      return id;
    } catch (e) {
      console.log(e);
    }
  });
}

async function getAllUser(req, res) {
  await User.find({}, (err, user) => {
    try {
      res.json(user);
    } catch {
      console.log(err);
    }
  });
}

async function getOneUser(req, res) {
  await User.findOne({ email: req.body.email }, (err, user) => {
    try {
      res.json(user);
    } catch {
      console.log(err);
    }
  });
}

async function addUser(req, res) {
  let {
    firts_name,
    last_name,
    email,
    ip_address,
    money,
    type_credit_card,
    credit_card,
    password,
    gender,
  } = req.body;

  let id = compareIds(Math.floor(Math.random() * 10000));

  let newUser = new User({
    // agregate id and more data to created a new user
    id,
    firts_name,
    last_name,
    email,
    money,
    type_credit_card,
    credit_card,
    password,
    gender,
  });
  await newUser.save();
  res.json(newUser);
}

module.exports = {
  getAllUser,
  getOneUser,
};
