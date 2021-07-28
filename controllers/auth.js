const User = require("../models/user")

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