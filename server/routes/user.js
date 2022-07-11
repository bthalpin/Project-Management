const router = require('express').Router();
const {
    login,
    createUser,
} = require('../controllers/userControllers.js');

// /user
router.route('/').post(createUser);
router.route('/login').post(login)

module.exports = router;
