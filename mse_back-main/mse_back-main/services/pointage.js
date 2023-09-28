const pointagemodel=require('../models/pointagemodel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')



exports.getpointages=asyncHandler(async(req,res) => {

    const pointages = await pointagemodel.find({}).populate('userId') ;
    res.status(200).json({results:pointages.length,data:pointages})
  });
  exports.getpointagesById=asyncHandler(async(req,res) => {

    const pointages = await pointagemodel.find({userId:req.params.id}).populate('userId') ;
    res.status(200).json({results:pointages.length,data:pointages})
  });

// @desc    Get specific pointage by id
// @route   GET api/pointage/:id
// @access  Private
exports.getpointage = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const pointages = await pointagemodel.findById(id);
  if(!pointages)
  {
    return   next(new ApiError(`pointage not found for this id ${id}`,404)); 
}
  res.status(200).json({data: pointages});
})




// @desc    Create a new pointage
// @route   POST api/pointages/
// @access  Private
exports.createpointage=asyncHandler(async(req,res)=>{
    const body=req.body
    const pointages=await pointagemodel.create(body)
     res.status(201).json({data:pointages})
   
});

// @desc    update specified pointage
// @route   PUT api/pointages/:id
// @access  Private
exports.updatepointage =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const pointages = await pointagemodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!pointages)
    {
      return   next(new ApiError(`pointages not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: pointages});  
})


// @desc    delete specified pointage
// @route   DELETE api/pointages/:id
// @access  Private
exports.deletepointage =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const pointages=await pointagemodel.findById(id);
   if(!pointages)
    {
      return   next(new ApiError(`pointage not found for this id ${id}`,404)); 
    }
    const deletes=await pointagemodel.deleteOne({_id:id});
  res.status(204).send();  
});
