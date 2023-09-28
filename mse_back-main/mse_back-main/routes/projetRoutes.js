const express=require('express')
const {createprojetValidator,deleteprojetValidator,getprojetValidator,updateprojetValidator
       }=require('../utils/validators/projetValidator');


const {createprojet,deleteprojet,getprojet,getprojets,updateprojet
        ,createFilterObj,getSommeProjets, getprojetsNoSuperviseur,getprojetsNoclient,getprojetsByClient
    }=require('../services/projetService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_cour/chapitres',chapitre);
router.route('/byclient/:id').get(getprojetsByClient);

router.route('/SommeProjets').get(getSommeProjets);
router.route('/').get(createFilterObj,getprojets)
                 .post(createprojetValidator,createprojet);
router.route('/nosuperviseur').get(getprojetsNoSuperviseur);
router.route('/noclient').get(getprojetsNoclient);

router.route('/:id').get(getprojetValidator,getprojet)
                    .put(updateprojetValidator,updateprojet)
                    .delete(deleteprojetValidator,deleteprojet);
module.exports = router;