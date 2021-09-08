const { Router } = require("express");
const router = Router();
const model = require("../models/user");

router.get("/users", async (req, res, next) => {
  await model.find({}, (err, user) => {
    res.json(user);
  });
});

module.exports = router;
