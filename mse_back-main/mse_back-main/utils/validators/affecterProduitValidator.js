const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const userModel=require('../../models/userModel.js')
const produitModel=require('../../models/produitModel.js')
exports.getaffecterProduitValidator=[
    check('id').isMongoId().withMessage('Invalid affecterProduit id format'),
    validatorMiddleware,
];

exports.createaffecterProduitValidator=[
    check('quantite').notEmpty().withMessage('quantite required').isNumeric().withMessage('quantite must be Number'),
    check('id_superviseur').optional().isMongoId().withMessage('Invalid superviseur id ')
   ,
    check('id_produit').isMongoId().withMessage('Invalid  produit id ') 
    .custom((id_produit) =>
    produitModel.findById(id_produit).then((produit) => {
              if (!produit) {
                return Promise.reject(
                  new Error(`No produit for this id: ${id_produit}`)
                );
              }
            })
          ),


      
    validatorMiddleware,
];

exports.updateaffecterProduitValidator=[
    check('id').isMongoId().withMessage('Invalid affecterProduit id format'),
    validatorMiddleware,
];

exports.deleteaffecterProduitValidator=[
    check('id').isMongoId().withMessage('Invalid affecterProduit id format'),
    validatorMiddleware,
];
