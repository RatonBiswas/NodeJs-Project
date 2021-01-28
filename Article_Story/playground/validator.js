const router = require('express').Router();
const {check,validationResult } = require('express-validator');
const Flash = require('../utils/Flash')

router.get('/validator',(req,res,next)=>{
    // console.log(req.flash('success'));
    console.log(Flash.getMessage(req));
    res.render('playground/signup',{title:"Validator Playground"})
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage(`username is empty`)
            .isLength({max:15})
            .withMessage(`Username can not be greater than 15 characters`)
            .trim(),
        check('email')
            .isEmail()
            .withMessage(`Please Provide a valid email address`)
            .normalizeEmail(),
            
            //custom validation
        check('password').custom(value=>{
            if(value.length<5){
                throw new Error('Password must be at least 5 characters')
            }
            return true
        }),

        check('confirmPassword').custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error('Password does not match')
            }
            return true
        })
    ],
    (req,res,next)=>{
        const errors = validationResult(req);
        // const formatter = (error)=> error.msg
        if(!errors.isEmpty()){
            req.flash('fail','There Is Some Error')
        }else{
            req.flash('success','There Is No Error')
        }
        res.redirect('/playground/validator')
        // console.log(errors.isEmpty());
        // console.log(errors.array());
        // console.log(errors.mapped());
        // console.log(errors.formatWith(formatter).mapped());
        //     console.log(req.body.username,req.body.email);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        //   }
        // res.render('playground/signup',{title:"Validator Playground"})
})

module.exports= router;