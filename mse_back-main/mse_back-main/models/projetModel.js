const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema(
  {
    nom_projet: {
      type: String,
      required: true,
    },
    deadLine: {
      type: Date,
      required: true,
    },
    status: {
        type: String,
        required: true,
        default:"en cours"
      },
      id_superviseur: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        default:null,

        required: false,
      },
     

    id_client: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      default:null,
      required: false,
    },
    cout:{
      type:Number,
      require:[true,'cout require']
  },

  },
  {
    timestamps: true,

  }
);


const Projet=mongoose.model('projet',projetSchema);
module.exports=Projet;