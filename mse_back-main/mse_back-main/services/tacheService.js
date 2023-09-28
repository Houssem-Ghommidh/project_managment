const Tachemodel=require('../models/tacheModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')

const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

exports.uploadTacheImages = uploadMixOfImages([

  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.resizeTacheImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover

  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `taches-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/taches/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});
// @desc    Get all tache
// @route   GET api/taches/
// @access  Private
exports.gettaches=asyncHandler(async(req,res) => {
    const tache = await Tachemodel.find({}).populate('id_projet') ;
    res.status(200).json({results:tache.length,data:tache})
  });
  exports.getTacheByIdProject=asyncHandler(async(req,res) => {
    const {id} = req.params;
    const tache = await Tachemodel.find({id_projet:id}) ;
    res.status(200).json({results:tache.length,data:tache})
  });
// @desc    Get specific tache by id
// @route   GET api/tache/:id
// @access  Private
exports.gettache = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const taches = await Tachemodel.findById(id);
  if(!taches)
  {
    return   next(new ApiError(`tache not found for this id ${id}`,404)); 
}
  res.status(200).json({data: taches});
})

exports.createFilterObj=(req,res,next) => {
  let filterObject={};
  if(req.params.id_catalogue) filterObject ={id_catalogue:req.params.id_catalogue};
  req.filterObj =filterObject;
next();
}


// @desc    Create a new tache
// @route   POST api/taches/
// @access  Private
exports.createtache=asyncHandler(async(req,res)=>{
    const body=req.body
    const taches=await Tachemodel.create(body)
     res.status(201).json({data:taches})
   
});

// @desc    update specified tache
// @route   PUT api/taches/:id
// @access  Private
exports.updatetache =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const taches = await Tachemodel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!taches)
    {
      return   next(new ApiError(`taches not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: taches});  
})


// @desc    delete specified tache
// @route   DELETE api/taches/:id
// @access  Private
exports.deletetache =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const taches=await Tachemodel.findById(id);
   if(!taches)
    {
      return   next(new ApiError(`tache not found for this id ${id}`,404)); 
    }
    await Tachemodel.deleteOne({_id:id});
  res.status(204).json({data: taches});  
});
