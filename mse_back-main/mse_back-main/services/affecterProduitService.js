const AffecterProduitmodel=require('../models/affecterPrduitModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all affecterProduit
// @route   GET api/affecterProduits/
// @access  Private
exports.getaffecterProduits=asyncHandler(async(req,res) => {
    const affecterProduit = await AffecterProduitmodel.find({}).populate('id_technicien').populate('id_superviseur').populate('id_produit') ;

    res.status(200).json({results:affecterProduit.length,data:affecterProduit})
  });
  exports.getaffecterProduitsbyTechnicien=asyncHandler(async(req,res) => {
    const affecterProduit = await AffecterProduitmodel.find({id_technicien:req.params.id}).populate('id_technicien').populate('id_superviseur').populate('id_produit') ;

    res.status(200).json({results:affecterProduit.length,data:affecterProduit})
  });

// @desc    Get specific affecterProduit by id
// @route   GET api/affecterProduit/:id
// @access  Private
exports.getaffecterProduit = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const affecterProduits = await AffecterProduitmodel.findById(id);
  if(!affecterProduits)
  {
    return   next(new ApiError(`affecterProduit not found for this id ${id}`,404)); 
}
  res.status(200).json({data: affecterProduits});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new affecterProduit
// @route   POST api/affecterProduits/
// @access  Private
exports.createaffecterProduit=asyncHandler(async(req,res)=>{
    const body=req.body
    const affecterProduits=await AffecterProduitmodel.create(body)
     res.status(201).json({data:affecterProduits})
   
});

// @desc    update specified affecterProduit
// @route   PUT api/affecterProduits/:id
// @access  Private
exports.updateaffecterProduit =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const affecterProduits = await AffecterProduitmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!affecterProduits)
    {
      return   next(new ApiError(`affecterProduits not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: affecterProduits});  
})


// @desc    delete specified affecterProduit
// @route   DELETE api/affecterProduits/:id
// @access  Private
exports.deleteaffecterProduit =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const affecterProduits=await AffecterProduitmodel.findById(id);
   if(!affecterProduits)
    {
      return   next(new ApiError(`affecterProduit not found for this id ${id}`,404)); 
    }
    const deletes=await AffecterProduitmodel.deleteOne({_id:id});
  res.status(204).send();  
});
