const User = require("../models/user");

// if id exits find a new number ramdom
// else id no exits in databse create a new user using that id
async function compareIds(id) {
  await User.findOne({ id }, (err, user) => {
    try {
      if (user) {
        console.log("user exits");
        compareIds(Math.floor(Math.random() * 10000));
      }
      return id;
    } catch {
      console.log(err);
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
  const {
    firts_name,
    last_name,
    email,
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

// at the end this function of delete user, this redirect user /
// recive a id in parms
// find a user and return the id
async function deleteUser(id) {
  await User.remove({ id });
}

// this function is use to find a user with her email
async function findUser(req, res) {
	const {email} = req.body;
	await User.findOne({ email }, (err, user) => {
			res.json(user);
			console.log(err);
	});
}

// this function is use to update data user
async function updateUser(req, res) {
	const id = req.parms.id;
	// save data user
	const user = await User.findOne( { id } );	
	// delete user
	await User.remove( { id } );
	// modify data users
	user.firts_name = req.body.firts_name;
	user.last_name = req.body.last_name;
	user.credit_card = req.body.credit_card;
	user.type_credit_card = req.body.type_credit_card;
	await user.save();
	res.json({message: "user update successfully"});
}

module.exports = {
  getAllUser,
  getOneUser,
  addUser,
  deleteUser,
	findUser,
	updateUser,
};








