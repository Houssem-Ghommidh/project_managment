const  mongoose=require('mongoose');


const produitShema=new mongoose.Schema(
    {
        nom_produit:{
            type:String,
            trim:true,
            require:[true,'nom_produit require']
        },
        quantite:{
            type:Number,
            trim:true,
            require:[true,'quantite require']
        },
        id_fournisseur:{
            type:mongoose.Schema.ObjectId,
            ref:'fournisseur',
            require:[false,'id_fournisseur require']
        },
        image:{
            type:String,
            trim:true,
        },
        prix:{
            type:Number,
            require:[true,'prix require']
        },
        
    },{timestamps:true}
);



const Produit=mongoose.model('produit',produitShema);
module.exports=Produit;