const Demandedachatmodel=require('../models/demandeDAchatModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all demandedachat
// @route   GET api/demandedachats/
// @access  Private
exports.getdemandedachats=asyncHandler(async(req,res) => {
    const demandedachat = await Demandedachatmodel.find({}).populate('id_technicien').populate('id_superviseur').populate('id_produit') ;

    res.status(200).json({results:demandedachat.length,data:demandedachat})
  });
  exports.getdemandedachatsByTechnicien=asyncHandler(async(req,res) => {
    const demandedachat = await Demandedachatmodel.find({id_technicien:req.params.id}).populate('id_technicien').populate('id_superviseur').populate('id_produit') ;

    res.status(200).json({results:demandedachat.length,data:demandedachat})
  });

// @desc    Get specific demandedachat by id
// @route   GET api/demandedachat/:id
// @access  Private
exports.getdemandedachat = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const demandedachats = await Demandedachatmodel.findById(id);
  if(!demandedachats)
  {
    return   next(new ApiError(`demandedachat not found for this id ${id}`,404)); 
}
  res.status(200).json({data: demandedachats});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new demandedachat
// @route   POST api/demandedachats/
// @access  Private
exports.createdemandedachat=asyncHandler(async(req,res)=>{
    const body=req.body
    const demandedachats=await Demandedachatmodel.create(body)
     res.status(201).json({data:demandedachats})
   
});

// @desc    update specified demandedachat
// @route   PUT api/demandedachats/:id
// @access  Private
exports.updatedemandedachat =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const demandedachats = await Demandedachatmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!demandedachats)
    {
      return   next(new ApiError(`demandedachats not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: demandedachats});  
})


// @desc    delete specified demandedachat
// @route   DELETE api/demandedachats/:id
// @access  Private
exports.deletedemandedachat =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const demandedachats=await Demandedachatmodel.findById(id);
   if(!demandedachats)
    {
      return   next(new ApiError(`demandedachat not found for this id ${id}`,404)); 
    }
    const deletes=await Demandedachatmodel.deleteOne({_id:id});
  res.status(204).send();  
});
