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