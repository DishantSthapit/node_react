const mongoose = require('mongoose')

//We make use of the mongoose Schema to make schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
})

// Mongoose model is used here to create a Schema model which is exported like this
module.exports =  mongoose.model("Post", postSchema)