const User = require("../models/user");

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

  // create a funtion to compare id in databse
  // if id exits find a new number ramdom
  // else id no exits in databse create a new user using that id

  let User = new User({
    // agregate id and more data to created a new user
  });
}

// at the end this function of delete user, this redirect user /
// recive a id in parms
// find a user and return the id
async function deleteUser(id) {
  await User.remove({ id });
}

module.exports = {
  getAllUser,
  getOneUser,
  addUser,
  deleteUser,
};
