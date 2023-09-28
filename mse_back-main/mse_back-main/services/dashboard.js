const Produitmodel = require('../models/produitModel')
const FournisseurModel=require('../models/fournisseurModel')
const Demandedachatmodel=require('../models/demandeDAchatModel')
const usermodel=require('../models/userModel')
const Projetmodel=require('../models/projetModel')
const Rapportmodel=require('../models/rapportModel')
const Tachemodel=require('../models/tacheModel')
const pointagemodel=require('../models/pointagemodel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
exports.getpointages=asyncHandler(async(req,res) => {

    const pointages = await pointagemodel.find().populate('userId').limit(5).sort({createdAt:-1}) ;
    res.status(200).json({results:pointages.length,data:pointages})
  });

  exports.getDashboard=asyncHandler(async(req,res) => {

    const tache = (await Tachemodel.find()).length ;

    const rapport = (await Rapportmodel.find({})).length ;

    const projet = (await Projetmodel.find({})).length ;

    const technicien = (await usermodel.find({role:'technicien'})).length ;
    const client = (await usermodel.find({role:'client'})).length ;

    const superviseur = (await usermodel.find({role:'superviseur'})).length ;

    const admin = (await usermodel.find({role:'admin'})).length ;
    const fournisseur = (await FournisseurModel.find({})).length ;
    const demandedachat = (await Demandedachatmodel.find({isConfirmed:false})).length ;
    const produit = (await Produitmodel.find({})).length ;

    res.status(200).json({data:{tache,rapport,projet,technicien,client,superviseur,admin,fournisseur,demandedachat,produit}})


   
  });