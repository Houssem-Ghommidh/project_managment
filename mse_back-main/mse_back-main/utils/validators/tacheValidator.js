const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const projetModel=require('../../models/projetModel.js')

exports.gettacheValidator=[
    check('id').isMongoId().withMessage('Invalid tache id format'),
    validatorMiddleware,
];

exports.createtacheValidator=[
    check('nom_tache').notEmpty().withMessage('nom_tache required').isString().withMessage('nom_tache must be String'),
    check('date_debut').notEmpty().withMessage('date_debut required').isDate().withMessage('date_debut required'),
    check('date_fin').notEmpty().withMessage('date_fin required').isDate().withMessage('date_fin required'),
    check('id_projet').isMongoId().withMessage('Invalid projet id ')
    .custom((id_projet) =>
    projetModel.findById(id_projet).then((projet) => {
              if (!projet) {
                return Promise.reject(
                  new Error(`No projet for this id: ${id_projet}`)
                );
              }
            })
          ),

      
    validatorMiddleware,
];

exports.updatetacheValidator=[
    check('id').isMongoId().withMessage('Invalid tache id format'),
    validatorMiddleware,
];

exports.deletetacheValidator=[
    check('id').isMongoId().withMessage('Invalid tache id format'),
    validatorMiddleware,
];
