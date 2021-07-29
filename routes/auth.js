const express = require('express')
const {signup, signin} = require('../controllers/auth')
const {userSignupValidator} = require('../validator')

// Router is a method in express which is used to route
const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

module.exports = router
