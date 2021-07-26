const Post = require("../models/post")

exports.getPosts = (req, res) => {
    res.send({
        posts: [
            {title: "First Post"},
            {title: "Second Post"}
        ]
    })
};

exports.createPosts = (req, res ) => {
    const post = new Post(req.body);
    post.save((err, result)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            title: result.title,
            body: result.body
        })
    })
}