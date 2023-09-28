const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const userModel=require('../../models/userModel.js')

exports.getprojetValidator=[
    check('id').isMongoId().withMessage('Invalid projet id format'),
    validatorMiddleware,
];

exports.createprojetValidator=[
    check('nom_projet').notEmpty().withMessage('nom_projet required').isString().withMessage('nom_projet must be String'),
    check('deadLine').notEmpty().withMessage('deadLine required').isDate().withMessage('deadLine must be date'),
    check('status').notEmpty().withMessage('status required').isString().withMessage('status must be string'),
    check('image').optional(),
    // check('id_superviseur').isMongoId().withMessage('Invalid superviseur id ')
    // .custom((id_superviseur) =>
    // userModel.findOne({_id:id_superviseur,role:"superviseur"}).then((superviseur) => {
    //           if (!superviseur) {
    //             return Promise.reject(
    //               new Error(`No superviseur for this id : ${id_projet}`)
    //             );
    //           }
    //         })
    //       ),
    // check('id_technicien').isMongoId().withMessage('Invalid  technicien id ')
    // .custom((id_technicien) =>
    // userModel.findOne({_id:id_technicien,role:"technicien"}).then((technicien) => {
    //           if (!technicien) {
    //             return Promise.reject(
    //               new Error(`No technicien for this id: ${id_technicien}`)
    //             );
    //           }
    //         })
    //       ),
    // check('id_client').isMongoId().withMessage('Invalid  client id ') 
    // .custom((id_client) =>
    // userModel.findOne({_id:id_client,role:"client"}).then((client) => {
    //           if (!client) {
    //             return Promise.reject(
    //               new Error(`No client for this id: ${id_client}`)
    //             );
    //           }
    //         })
    //       ),


      
    validatorMiddleware,
];

exports.updateprojetValidator=[
    check('id').isMongoId().withMessage('Invalid projet id format'),
    validatorMiddleware,
];

exports.deleteprojetValidator=[
    check('id').isMongoId().withMessage('Invalid projet id format'),
    validatorMiddleware,
];
