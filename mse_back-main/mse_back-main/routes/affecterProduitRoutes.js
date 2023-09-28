const express=require('express')
const {createaffecterProduitValidator,deleteaffecterProduitValidator,updateaffecterProduitValidator,getaffecterProduitValidator
       }=require('../utils/validators/affecterProduitValidator');


const {createaffecterProduit,deleteaffecterProduit,getaffecterProduit,getaffecterProduits,updateaffecterProduit
        ,createFilterObj,getaffecterProduitsbyTechnicien
    }=require('../services/affecterProduitService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_cour/chapitres',chapitre);
router.route('/bytechnicien/:id').get(getaffecterProduitsbyTechnicien)
router.route('/').get(createFilterObj,getaffecterProduits)
                 .post(createaffecterProduitValidator,createaffecterProduit);

router.route('/:id').get(getaffecterProduitValidator,getaffecterProduit)
                    .put(updateaffecterProduitValidator,updateaffecterProduit)
                    .delete(deleteaffecterProduitValidator,deleteaffecterProduit);
module.exports = router;