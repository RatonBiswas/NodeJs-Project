const router = require('express').Router();
const {check,validationResult } = require('express-validator');

router.get('/validator',(req,res,next)=>{
    res.render('playground/signup',{title:"Validator Playground"})
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage(`username is empty`)
            .isLength({max:15})
            .withMessage(`Username can not be greater than 15 characters`),
        check('email')
            .isEmail()
            .withMessage(`Please Provide a valid email address`)
    ],
    (req,res,next)=>{
        const errors = validationResult(req);
        console.log('create successfully');
        console.log(errors);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        //   }
        res.render('playground/signup',{title:"Validator Playground"})
})

module.exports= router;