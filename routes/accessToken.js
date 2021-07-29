const express = require('express')
const {getAccessToken} = require('../controllers/acessToken')
const {requireSignin} = require('../controllers/auth')
// Router is a method in express which is used to route
const router = express.Router();

router.get("/personal-access-token", requireSignin, getAccessToken);

module.exports = router
