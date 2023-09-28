const express=require('express')
const {createrapportValidator,deleterapportValidator,getrapportValidator,updaterapportValidator
       }=require('../utils/validators/rapportValidator');


const {createrapport,deleterapport,getrapport,getrapports,updaterapport
        ,createFilterObj,getrapportsByTechnicien
    }=require('../services/rapportService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_cour/chapitres',chapitre);
router.route('/bytechnicien/:id').get(getrapportsByTechnicien)
router.route('/').get(createFilterObj,getrapports)
                 .post(createrapportValidator,createrapport);

router.route('/:id').get(getrapportValidator,getrapport)
                    .put(updaterapportValidator,updaterapport)
                    .delete(deleterapportValidator,deleterapport);
module.exports = router;