const  mongoose=require('mongoose');

const fournisseurShema=new mongoose.Schema(
    {
        nom_fournisseur:{
            type:String,
            trim:true,
            require:[true,'nom_fournisseur require']
        },
      
        num_tel:{
            type:String,
            trim:true,
            require:[true,'num_tel require']
        },
        email:{
            type:String,
            trim:true,
            require:[false,'email optional'],
            unique:true
            
        },
        adresse:{
            type:String,
            trim:true,
            require:[false,'adresse optional']
        }

    },{timestamps:true}
);

const Fournisseur=mongoose.model('fournisseur',fournisseurShema);
module.exports=Fournisseur;