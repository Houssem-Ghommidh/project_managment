const  mongoose=require('mongoose');

const affecterProuitShema=new mongoose.Schema(
    {
        id_technicien:{
            type:mongoose.Schema.ObjectId,
            ref:'user',
            require:false,
            default:null
        },
        id_superviseur:{
            type:mongoose.Schema.ObjectId,
            ref:'user',
            require:false,
            default:null
        },
        quantite:{
            type:Number,
            require:[true,'quantite require']
        },
        id_produit:{
            type:mongoose.Schema.ObjectId,
            ref:'produit',
            require:[true,'id_produit require']
        },
      

    },{timestamps:true}
);



const AffecterProuit=mongoose.model('affecterProuit',affecterProuitShema);
module.exports=AffecterProuit;