const {Router} = require('express');
const router = Router();

router.get('/profile', (req, res, next) => {
    res.json({message: 'logged'});
})

module.exports = router;


