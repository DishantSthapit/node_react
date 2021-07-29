const mongoose = require('mongoose')
const uuidv1 = require('uuidv1')
const crypto = require('crypto')

const userSchema =  new mongoose.Schema({
    // trim will basically remove any extra spaces which might be added by mistake in the beginning or end
    name:{
        type:String,
        trim:true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required: true
    },
    hashed_password:{
        type:String,
        required: true
    },
    salt:String,
    created:{
        type:Date,
        default: Date.now
    },
    updated:{
        type:Date,
    }
})


/*
    Virtual fields are additional fields for a given model
    Their values can be set manually or automatically with defined functionality
    Keep in mind : virtual properties do not get stored in the database(password)
    They only exist logically and are not written to the document's collection
*/


userSchema.virtual('password')
.set(function (password) {
    //create temporary password called _password
    this._password = password
    // generate a timestamp
    this.salt = uuidv1()
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})



//we can create methods for the schema by this way
// crypto is the nodejs inbuilt function which allows to create a hash password 
userSchema.methods = {
    encryptPassword: function(password) {
        if(!password) {
            return "";
        }
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch(err) {
            return ""
        }
    }
}


module.exports =  mongoose.model("User",userSchema)
