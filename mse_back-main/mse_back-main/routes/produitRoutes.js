const express=require('express')
const {getproduitValidator,
      updateproduitValidator,
      deleteproduitValidator,
      createproduitValidator, 
       }=require('../utils/validators/produitValidators');


const {getproduits,
       createproduit,
       getproduit,
       getSommeProduits,
       getCountProduits,
       updateproduit,
       deleteproduit,
       createFilterObj,
       uploadProduitImage,
       resizeImage
    }=require('../services/produitService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_produit/chapitres',chapitre);

router.route('/nombreProduits').get(getCountProduits);
router.route('/somme').get(getSommeProduits);

router.route('/').get(createFilterObj,getproduits)
.post(uploadProduitImage, resizeImage,createproduitValidator,createproduit);

router.route('/:id').get(getproduitValidator,getproduit)
.put(updateproduitValidator,updateproduit)
       .delete(deleteproduitValidator, deleteproduit);



module.exports = router;