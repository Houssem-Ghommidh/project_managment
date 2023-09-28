const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema(
  {

    nom_tache: {
      type: String,
      required: true,
    },
    num_tache: {
      type: String,
      required: true,
    },
    date_debut: {
      type: Date,
      required: true,
    },
    date_fin: {
        type: Date,
        required: true,
      },
    duration:String,
    id_projet: {
      type: mongoose.Schema.ObjectId,
      ref: 'projet',
      required: [true, 'Tache must be belong to Projet'],
    },

  },
  {
    timestamps: true,
 
  }
);




const setImageURL = (doc) => {

  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/api/tacheImages/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
tacheSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
tacheSchema.post('save', (doc) => {
  setImageURL(doc);
});

const Tache=mongoose.model('tache',tacheSchema);
module.exports=Tache;