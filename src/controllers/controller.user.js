const User = require("../models/user");

// if id exits find a new number ramdom
// else id no exits in databse create a new user using that id
async function compareIds(id) {
  const user = await User.findOne({ id }); 
	if (user) {
		await compareIds(Math.floor(Math.random() * 10000));
	}
	return id;
}

async function getAllUser(req, res) {
	const users = await User.find();
	res.json(users);
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
	const id = req.params.id;
	// save data user
	User.findOne( { id },async (err, user) => {
		let newUser = user;
		newUser.firts_name = req.body.firts_name;
		newUser.last_name = req.body.last_name; 
		newUser.credit_card = req.body.credit_card; 
		newUser.type_credit_card = req.body.type_credit_card;
		await newUser.save();
		res.json({message: "user update successfully"});

	});	
	
}

module.exports = {
  getAllUser,
  getOneUser,
  deleteUser,
	findUser,
	updateUser,
	compareIds,
};








