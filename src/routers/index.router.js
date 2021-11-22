const { Router } = require("express");
const router = Router();
const {findUser, updateUser, deleteUser, getAllUser} = require('../controllers/controller.user');
const {depositUser, deleteAllUser, getAllDepositsUser} = require('../controllers/controller.deposit'); 

// return all users
router.get("/users", getAllUser); 

// this route find a one user
router.post('/search-user', findUser);

// this route update data of user
router.post('/update-user/:id', updateUser);

// this route delete data of user
router.get('/delete-user/:id', (req, res, next) => {
	const id = req.params.id;
	deleteUser(id);
});

// this route will can return all history of transaccions made
router.get('/history-transactions', deleteAllUser);

// route for deposit a user 
router.post('/deposit/:id', depositUser);

// route for get all deposits mades for user
router.get('/history-deposits/:id', getAllDepositsUser);

module.exports = router;
