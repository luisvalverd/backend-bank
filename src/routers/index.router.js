const { Router } = require("express");
const router = Router();
const model = require("../models/user");
const {addUser, findUser, updateUser, deleteUser} = require('../controllers/controller.user');


// return all users
router.get("/users", async (req, res, next) => {
  await model.find({}, (err, user) => {
    res.json(user);
  });
});

// this route add a one user
router.post('/user', addUser);

// this route find a one user
router.get('/search-user', findUser);

// this route update data of user
router.post('/update-user/:id', updateUser);

// this route delete data of user
router.get('/delete-user/:id', (req, res, next) => {
	const id = req.params.id;
	deleteUser(id);
});

module.exports = router;
