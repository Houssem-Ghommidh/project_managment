const express=require('express')
const {createdemandedachatValidator,deletedemandedachatValidator,getdemandedachatValidator,updatedemandedachatValidator
       }=require('../utils/validators/demandeDAchatvalidator');


const {createdemandedachat,deletedemandedachat,getdemandedachat,getdemandedachats,updatedemandedachat
        ,createFilterObj,getdemandedachatsByTechnicien
    }=require('../services/demandachatService');


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

// router.use('/:id_cour/chapitres',chapitre);
router.route('/bytechnicien/:id').get(getdemandedachatsByTechnicien)
router.route('/').get(createFilterObj,getdemandedachats)
                 .post(createdemandedachatValidator,createdemandedachat);

router.route('/:id').get(getdemandedachatValidator,getdemandedachat)
                    .put(updatedemandedachatValidator,updatedemandedachat)
                    .delete(deletedemandedachatValidator,deletedemandedachat);
module.exports = router;