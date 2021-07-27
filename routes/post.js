const express = require('express')
const {getPosts,createPosts} = require('../controllers/post')
const validator = require('../validator')
// Router is a method in express which is used to route
const router = express.Router();

router.get("/", getPosts);

//validation before creating a post, if it passes it goes to next middleware i.e. postController.createPosts
router.post("/post", validator.createPostValidator, createPosts);

module.exports = router
