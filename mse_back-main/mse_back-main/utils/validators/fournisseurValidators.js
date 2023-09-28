const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const fournisseurModel=require('../../models/fournisseurModel')

exports.getfournisseurValidator=[
    check('id').isMongoId().withMessage('Invalid fournisseur id format'),
    validatorMiddleware,
];

exports.createfournisseurValidator=[
    check('nom_fournisseur').notEmpty().withMessage('nom_fournisseur required'),
    check('num_tel').notEmpty().withMessage('num_tel required'),
    check('email').notEmpty().withMessage('email required').isEmail().withMessage('invalid Email')
    .custom((value, { req }) => {
        return fournisseurModel.findOne({email: req.body.email}).then(
            (review) => {
              if (review) {
                return Promise.reject(
                  new Error('email already exist')
                );
              }
            }
          )}),
    check('adresse').optional()
    ,
    validatorMiddleware,
];

exports.updatefournisseurValidator=[
    check('id').isMongoId().withMessage('Invalid fournisseur id format'),
    validatorMiddleware,
];

exports.deletefournisseurValidator=[
    check('id').isMongoId().withMessage('Invalid fournisseur id format'),
    validatorMiddleware,
];
