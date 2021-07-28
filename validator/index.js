exports.createPostValidator = (req,res,next) => {
    //title

    req.check('title','title required').notEmpty();
    req.check('title','Must be minimum 4 and max 150 length').isLength({
        min: 4,
        max:150
    })

     //body

     req.check('body','body required').notEmpty();
     req.check('body','Must be minimum 4 and max 2000 length').isLength({
         min: 4,
         max:2000
     })

     //check errors
     // if there is error show the first error
     const errors = req.validationErrors()
     if(errors) {
         const firstError = errors.map(err => err.msg)[0]
         res.status(400).json({error:firstError})
     }

     //proceed to next middleware
     next();
}


exports.userSignupValidator = (req,res,next) => {
    //name
    req.check('name','name required').notEmpty();
    req.check('name','name must be minimum 2 and max 20 length').isLength({
        min: 2,
        max:20
    })

    //email
    req.check('email','name required').notEmpty();
    req.check('email').matches(/.+\@.+\..+/).withMessage("email must be valid").isLength({
        min: 5,
        max:32
    }).withMessage("password must be minimum 5 character long")


    //password
    req.check('password','password required').notEmpty();
    req.check('password').isLength({
        min: 6,
    }).withMessage('password must be minimum 6 character long').matches(/\d/).withMessage('password must have a digit')

    //check errors
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(err => err.msg)[0]
        res.status(400).json({error:firstError})
    }

    //proceed to next middleware
    next();
}