const  mongoose=require('mongoose');

const pointage=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:'user',
            require:[true,'userID require'],
        },
  
        role:{
            type:String,
            require:[true,'role require']
        },
        position:{
            type:String,
            require:[true,'position require']
        },
      

    },{timestamps:true}
);



const Pointage=mongoose.model('pointage',pointage);
module.exports=Pointage;