const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require("../models/user")
const expressJwt = require("express-jwt")

// findOne method will gives us the result as soon as found based on query passed
exports.signup = async (req,res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) {
       return res.status(403).json({error: "email already exists"})
    }
    const user = await new User(req.body);
    user.save().then((result) => {
        res.status(200).json({
            message: "Signup success! Please login"
        })
    })

}

exports.signin =  (req,res) => {
    //find the user based on user
    const { email,password } = req.body
    User.findOne({email}, (err, user) => {
        // if error or no user
        if(err || !user) {
            return res.status(401).json({error: "user with that email does not exists please sign in"})
        }

        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if(!user.authenticate(password)) {
            return res.status(401).json({error: "email and password do not match"})
        }
        
        // generate a token with user id and secret - passing the user id and a secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        
        // persisit the tooken as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999})

        // return response with user and token to frontend client
        const {_id,name,email} = user; 
        return res.json({token, user: {_id,name,email}})
    })
}


exports.signout = (req,res) =>{
    // To sign out successfully we just need to clear the cookie
    res.clearCookie("t")
    return res.json({message:"Signout sucessfully"})
}

// This allows us to make authorization for any routes that does not have access token
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
})