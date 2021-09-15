const { Router } = require("express");
const router = Router();
const {findUser, updateUser, deleteUser, getAllUser} = require('../controllers/controller.user');


// return all users
router.get("/users", getAllUser); 

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
