const {body} = require('express-validator')
const validator = require('validator')

const linked = value=>{
    if(value){
        if(!validator.isURL(value)){
            throw new Error('Please Provide a valid URL')
        }
        
    }
    return true
}

module.exports = [
    body('name')
    .not().isEmpty().withMessage('Name Can Not Be Empty')
    .isLength({max:50}).withMessage('Name Can Not Be More than 30 characters')
    .trim(),

    body('title')
    .not()
    .isEmpty().withMessage('Title Can Not Be Empty')
    .isLength({max:100}).withMessage('Title Can Not Be More than 30 characters')
    .trim(),

    body('bio')
    .not().isEmpty().withMessage('Bio Can Not Be Empty')
    .isLength({max:500}).withMessage('Bio Can Not Be More than 500 characters')
    .trim(),

    body('website')
    .custom(linked),

    body('facebook')
    .custom(linked),

    body('twitter')
    .custom(linked),

    body('github')
    .custom(linked),

]