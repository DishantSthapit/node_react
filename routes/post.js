const express = require('express')
const postController = require('../controllers/post')

// Router is a method in express which is used to route
const router = express.Router();

router.get("/", postController.getPosts);
router.post("/post", postController.createPosts);

module.exports = router
