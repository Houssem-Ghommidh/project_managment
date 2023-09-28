const Fournisseurmodel=require('../models/fournisseurModel')
const ProduitModel=require('../models/produitModel')

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all fournisseur
// @route   GET api/fournisseurs/
// @access  Private
exports.getfournisseurs=asyncHandler(async(req,res) => {
    const fournisseur = await Fournisseurmodel.find({}) ;

    res.status(200).json({results:fournisseur.length,data:fournisseur})
  });

// @desc    Get specific fournisseur by id
// @route   GET api/fournisseur/:id
// @access  Private
exports.getfournisseur = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const fournisseurs = await Fournisseurmodel.findById(id);
  if(!fournisseurs)
  {
    return   next(new ApiError(`fournisseur not found for this id ${id}`,404)); 
}
  res.status(200).json({data: fournisseurs});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new fournisseur
// @route   POST api/fournisseurs/
// @access  Private
exports.createfournisseur=asyncHandler(async(req,res)=>{
    const body=req.body
    const fournisseurs=await Fournisseurmodel.create(body)
     res.status(201).json({data:fournisseurs})
   
});

// @desc    update specified fournisseur
// @route   PUT api/fournisseurs/:id
// @access  Private
exports.updatefournisseur =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const fournisseurs = await Fournisseurmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!fournisseurs)
    {
      return   next(new ApiError(`fournisseurs not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: fournisseurs});  
})


exports.getCountfournisseurs=asyncHandler(async(req,res) => {
    const fournisseur = await Fournisseurmodel.count() ;

    res.status(200).json({results:fournisseur.length,data:fournisseur})
  });


// @desc    delete specified fournisseur
// @route   DELETE api/fournisseurs/:id
// @access  Private
exports.deletefournisseur =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const fournisseurs=await Fournisseurmodel.findById(id);
   if(!fournisseurs)
    {
      return   next(new ApiError(`fournisseur not found for this id ${id}`,404)); 
    }
    
      await ProduitModel.updateMany({id_fournisseur:id},{$set: {id_fournisseur: null}})
    const deletes=await Fournisseurmodel.deleteOne({_id:id});
  res.status(204).send();  
});
