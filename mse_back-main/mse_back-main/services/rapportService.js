const Rapportmodel=require('../models/rapportModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all rapport
// @route   GET api/rapports/
// @access  Private
exports.getrapports=asyncHandler(async(req,res) => {
    const rapport = await Rapportmodel.find({}).populate('id_tache').populate('Technician_on_duty') ;
    console.log(rapport) 

    res.status(200).json({results:rapport.length,data:rapport})
  });
  exports.getrapportsByTechnicien=asyncHandler(async(req,res) => {
    const rapport = await Rapportmodel.find({Technician_on_duty:req.params.id}).populate('id_tache').populate('Technician_on_duty') ;
    console.log(rapport) 

    res.status(200).json({results:rapport.length,data:rapport})
  });

// @desc    Get specific rapport by id
// @route   GET api/rapport/:id
// @access  Private
exports.getrapport = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const rapports = await Rapportmodel.findById(id);
  if(!rapports)
  {
    return   next(new ApiError(`rapport not found for this id ${id}`,404)); 
}
  res.status(200).json({data: rapports});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new rapport
// @route   POST api/rapports/
// @access  Private
exports.createrapport=asyncHandler(async(req,res)=>{
    const body=req.body
    const rapports=await Rapportmodel.create(body)
     res.status(201).json({data:rapports})
   
});

// @desc    update specified rapport
// @route   PUT api/rapports/:id
// @access  Private
exports.updaterapport =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const rapports = await Rapportmodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!rapports)
    {
      return   next(new ApiError(`rapports not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: rapports});  
})


// @desc    delete specified rapport
// @route   DELETE api/rapports/:id
// @access  Private
exports.deleterapport =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const rapports=await Rapportmodel.findById(id);
   if(!rapports)
    {
      return   next(new ApiError(`rapport not found for this id ${id}`,404)); 
    }
    const deletes=await Rapportmodel.deleteOne({_id:id});
  res.status(204).send();  
});
