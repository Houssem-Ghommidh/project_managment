const express=require('express')



const {createpointage,deletepointage, getpointage,getpointages,updatepointage,getpointagesById
    }=require('../services/pointage');


    const router=express.Router();



router.route('/').get(getpointages)
                 .post(createpointage);
                 router.route('/byuserid/:id').get(getpointagesById);

router.route('/:id').get(getpointage)
                    .put(updatepointage)
                    .delete(deletepointage);
module.exports = router;