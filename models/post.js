const mongoose = require('mongoose')

//We make use of the mongoose Schema to make schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:"Title is required",
        minlength: 4,
        maxlength: 50,
    },
    body: {
        type: String,
        required:"Body is required",
        minlength: 4,
        maxlength: 2000,
    },
})

// Mongoose model is used here to create a Schema model which is exported like this
module.exports =  mongoose.model("Post", postSchema)