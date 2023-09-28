const express=require('express')
const {createfournisseurValidator,deletefournisseurValidator,getfournisseurValidator,updatefournisseurValidator
       }=require('../utils/validators/fournisseurValidators');


const {createfournisseur,deletefournisseur,getfournisseur,getfournisseurs,updatefournisseur,getCountfournisseurs
        ,createFilterObj
    }=require('../services/fournisseurService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_cour/chapitres',chapitre);

router.route('/nombreFournisseurs').get(getCountfournisseurs);
router.route('/').get(createFilterObj,getfournisseurs)
                 .post(createfournisseurValidator,createfournisseur);

router.route('/:id').get(getfournisseurValidator,getfournisseur)
                    .put(updatefournisseurValidator,updatefournisseur)
                    .delete(deletefournisseurValidator,deletefournisseur);
module.exports = router;