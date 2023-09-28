const  mongoose=require('mongoose');


const demandedachatShema=new mongoose.Schema(
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
        },quantite:{
            type:Number,
            trim:true,
            require:[true,'number require']
        },
        isConfirmed:{
            type:Boolean,
            default:false
        },
        description:{
            type:String,
            trim:true,
            require:false
        },
       
        id_produit:{
            type:mongoose.Schema.ObjectId,
            ref:'produit',
            require:[false,'id_produit require']
        }
    },{timestamps:true}
);


const Demandedachat=mongoose.model('demandedachat',demandedachatShema);
module.exports=Demandedachat;