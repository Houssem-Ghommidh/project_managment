const Produitmodel = require('../models/produitModel')
const FournisseurModel=require('../models/fournisseurModel')

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')

const {uploadSingleImage}= require('../middlewares/uploadImageMiddleware')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');
exports.uploadProduitImage = uploadSingleImage('image')
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename= `produit-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/produit/${filename}`);
    // Save image into our db
    req.body.image = filename;}
    next();
    });
// @desc    Get all produit
// @route   GET api/produits/
// @access  Private
exports.getproduits=asyncHandler(async(req,res) => {
    const produit = await Produitmodel.find({}).populate('id_fournisseur');
    

    res.status(200).json({results:produit.length,data:produit})
  });

// @desc    Get specific produit by id
// @route   GET api/produit/:id
// @access  Private
exports.getproduit = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const produits = await Produitmodel.findById(id);
  if(!produits)
  {
    return   next(new ApiError(`produit not found for this id ${id}`,404)); 
}
  res.status(200).json({data: produits});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new produit
// @route   POST api/produits/
// @access  Private
exports.createproduit=asyncHandler(async(req,res)=>{
    const body=req.body
    const produits=await Produitmodel.create(body)
     res.status(201).json({data:produits})
   
});

// @desc    update specified produit
// @route   PUT api/produits/:id
// @access  Private
exports.updateproduit =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
console.log(req.body);
  const produits = await Produitmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})
  if(!produits)
    {
      return   next(new ApiError(`produits not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: produits});  
})


exports.getSommeProduits = asyncHandler(async (req, res) => {
  var sommeTotale = 0;
  const produits = await Produitmodel.find({});

  for (produit of produits) {
    sommeTotale += (produit.prix * produit.quantite)
  }
  res.status(200).json({data: sommeTotale})
});
  

  exports.getCountProduits=asyncHandler(async(req,res) => {
    const produit = await Produitmodel.find({});
    

    res.status(200).json({results:produit.length,data:produit.length})
  });

// @desc    delete specified produit
// @route   DELETE api/produits/:id
// @access  Private
exports.deleteproduit =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const produits=await Produitmodel.findById(id);
   if(!produits)
    {
      return   next(new ApiError(`produit not found for this id ${id}`,404)); 
    }
    const deletes=await Produitmodel.deleteOne({_id:id});
  res.status(204).send();  
});
