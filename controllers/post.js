const Post = require("../models/post")

exports.getPosts = (req, res) => {
    //By default express sends 200 as status
    // select method helps you select the required fields for the posts
    const posts = Post.find().select("_id title body").then(posts => {
        res.json({
            posts
        })
    }).catch(err => console.log(err))
};

exports.createPosts = (req, res ) => {
    const post = new Post(req.body);
    post.save().then((result) => {
        res.status(200).json({
            post: result
        })
    })
}