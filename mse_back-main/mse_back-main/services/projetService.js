const Projetmodel=require('../models/projetModel')
const usermodel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all projet
// @route   GET api/projets/
// @access  Private
exports.getprojets=asyncHandler(async(req,res) => {
    const projet = await Projetmodel.find({}).populate('id_superviseur').populate('id_client') ;

    res.status(200).json({results:projet.length,data:projet})
  });
  exports.getprojetsByClient=asyncHandler(async(req,res) => {
    const projet = await Projetmodel.find({id_client:req.params.id}).populate('id_superviseur').populate('id_client') ;

    res.status(200).json({results:projet.length,data:projet})
  });

  exports.getprojetsNoSuperviseur=asyncHandler(async(req,res) => {
    const projet = (await Projetmodel.find({id_superviseur:null})) ;

    res.status(200).json({results:projet.length,data:projet})
  });
  exports.getprojetsNoclient=asyncHandler(async(req,res) => {
    const projet = await Projetmodel.find({id_client:null}) ;

    res.status(200).json({results:projet.length,data:projet})
  });


// @desc    Get specific projet by id
// @route   GET api/projet/:id
// @access  Private
exports.getprojet = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const projets = await Projetmodel.findById(id).populate('id_superviseur').populate('id_client');
  if(!projets)
  {
    return   next(new ApiError(`projet not found for this id ${id}`,404)); 
}
  res.status(200).json({data: projets});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new projet
// @route   POST api/projets/
// @access  Private
exports.createprojet=asyncHandler(async(req,res)=>{
    const body=req.body
    const projets=await Projetmodel.create(body)
     res.status(201).json({data:projets})
   
});

// @desc    update specified projet
// @route   PUT api/projets/:id
// @access  Private
exports.updateprojet =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
console.log(req.body)
  const projets = await Projetmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!projets)
    {
      return   next(new ApiError(`projets not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: projets});  
})
exports.getSommeProjets=asyncHandler(async(req,res) => {
const Cout_projets = await Projetmodel.aggregate([{$group: {_id:null, sum_val:{$sum:"$cout"}}}])
    res.status(200).json({data:Cout_projets})
  });
// @desc    delete specified projet
// @route   DELETE api/projets/:id
// @access  Private
exports.deleteprojet =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const projets=await Projetmodel.findById(id);
   if(!projets)
    {
      return   next(new ApiError(`projet not found for this id ${id}`,404)); 
    }
    const deletes=await Projetmodel.deleteOne({_id:id});
  res.status(204).send();  
});
