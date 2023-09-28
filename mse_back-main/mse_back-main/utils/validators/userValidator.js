const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const User=require('../../models/userModel.js')
const bcrypt=require('bcryptjs');

exports.getuserValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    validatorMiddleware,
];

exports.createuserValidator=[
    check('last_name').notEmpty().withMessage('last_name required'),
    check('first_name').notEmpty().withMessage('first_name required'),
    check('email').notEmpty().withMessage('email required')
                            .isEmail().withMessage('must be fomrat email')
                            .custom((val) =>
                                User.findOne({ email: val }).then((user) => {
                                    if (user) {
                                    return Promise.reject(new Error('E-mail already in user'));
                                    }
                                })),
    check('password').notEmpty().withMessage('password required')
                     .isLength({min:8}).withMessage('too short password name')
                     .custom((password,{req})=>{
                        if(password != req.body.passwordconfirm)
                        {
                            throw new Error('password confirmation incorrect')
                        }
                        return true;
                     }),
    check('passwordconfirm').notEmpty().withMessage('passwordconfirm required'),
    check('role').isIn(['superviseur','admin','technicien',"client"]).withMessage('role must be superviseur | admin | technicien [ client'),                 

    validatorMiddleware,
];

exports.updateuserValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    check('last_name').optional().notEmpty().withMessage('last_name required'),
    check('first_name').optional().notEmpty().withMessage('first_name required'),
    check('email').optional().notEmpty().withMessage('email required')
                            .isEmail().withMessage('must be fomrat email')
                            .custom((val,{req}) =>
                                User.findOne({ email: val }).then((user) => {
                                    if (user && user._id!=req.body._id) {
                                    return Promise.reject(new Error('E-mail already in user'));
                                    }
                                })),
    check('passwordconfirm').optional().notEmpty().withMessage('passwordconfirm required'),
    check('role').optional().isIn(['superviseur','admin','technicien',"client"]).withMessage('role must be superviseur | admin | technicien | client'),  
    validatorMiddleware,
];

exports.deleteuserValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    validatorMiddleware,
];

exports.changeuserpasswordvalidate=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    body('courrentpassword').notEmpty().withMessage('you must enter your current password'),
    body('passwordconfirm').notEmpty().withMessage('you must enter your current password confirm'),
    body('password').notEmpty().withMessage('you must enter your current new password ')
                    .custom(async(val,{req})=>{
                        //1) verify current password
                        const user=await User.findById(req.params.id);
                        if(!user){
                            throw new Error('there is no for this id');
                        }
                        const isCorrectpassword=await bcrypt.compare(req.body.courrentpassword,user.password);
                        if(!isCorrectpassword)
                        {
                            throw new Error('incorrect current password');
                        }
                        //2) verify password confirm
                        if(val != req.body.passwordconfirm)
                        {
                            throw new Error('password confirmation incorrect')
                        }
                        return true;
                    }),
    validatorMiddleware
]

exports.forgetuserpasswordvalidate=[
    body('email').notEmpty().withMessage('email required')
                  .isEmail().withMessage('must be fomrat email')
                  .custom((val) =>
                        User.findOne({ email: val }).then((user) => {
                            if (!user) {
                            return Promise.reject(new Error('E-mail not found'));
                            }
                        })),
    body('passwordconfirm').notEmpty().withMessage('you must enter your current password confirm'),
    body('password').notEmpty().withMessage('you must enter your current new password ')
                    .custom(async(val,{req})=>{
                        if(val != req.body.passwordconfirm)
                        {
                            throw new Error('password confirmation incorrect')
                        }
                        return true;
                    }),
    validatorMiddleware
]