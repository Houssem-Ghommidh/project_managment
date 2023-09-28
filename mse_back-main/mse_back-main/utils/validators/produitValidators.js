const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const fournisseurModel=require('../../models/fournisseurModel')

exports.getproduitValidator=[
    check('id').isMongoId().withMessage('Invalid produit id format'),
    validatorMiddleware,
];

exports.createproduitValidator=[
    check('nom_produit').notEmpty().withMessage('nom_produit required').isString().withMessage('nom_produit must be String'),
    check('quantite').notEmpty().withMessage('quantite required').isNumeric().withMessage('quantite must be numric'),
    check('prix').notEmpty().withMessage('prix required').isNumeric().withMessage('prix must be numric'),
    check('image').optional(),
    check('id_fournisseur').isMongoId().withMessage('Invalid fournisseur id ')
    .custom((id_fournisseur) =>
    fournisseurModel.findById(id_fournisseur).then((fournisseur) => {
              if (!fournisseur) {
                return Promise.reject(
                  new Error(`No fournisseur for this id: ${id_fournisseur}`)
                );
              }
            })
          ),

      
    validatorMiddleware,
];

exports.updateproduitValidator=[
    check('id').isMongoId().withMessage('Invalid produit id format'),
    validatorMiddleware,
];

exports.deleteproduitValidator=[
    check('id').isMongoId().withMessage('Invalid produit id format'),
    validatorMiddleware,
];
