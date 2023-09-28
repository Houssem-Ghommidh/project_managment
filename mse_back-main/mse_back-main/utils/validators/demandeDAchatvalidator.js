const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware.js");
const produitModel = require("../../models/produitModel.js");

exports.getdemandedachatValidator = [
  check("id").isMongoId().withMessage("Invalid demandedachat id format"),
  validatorMiddleware,
];

exports.createdemandedachatValidator = [
  check("quantite")
    .notEmpty()
    .withMessage("quantite required")
    .isNumeric()
    .withMessage("quantite must be Number"),
  check("isConfirmed")
    .notEmpty()
    .withMessage("isConfirmed required")
    .isBoolean()
    .withMessage("isConfirmed must be True or False"),
  check("description")
    .notEmpty()
    .withMessage("description required")
    .isString()
    .withMessage("description must be String"),
  check("id_produit")
    .isMongoId()
    .withMessage("Invalid projet id ")
    .custom((id_produit) =>
      produitModel.findById(id_produit).then((produit) => {
        if (!produit) {
          return Promise.reject(
            new Error(`No produit for this id: ${produit}`)
          );
        }
      })
    ),

  validatorMiddleware,
];

exports.updatedemandedachatValidator = [
  check("id").isMongoId().withMessage("Invalid demandedachat id format"),
  validatorMiddleware,
];

exports.deletedemandedachatValidator = [
  check("id").isMongoId().withMessage("Invalid demandedachat id format"),
  validatorMiddleware,
];
