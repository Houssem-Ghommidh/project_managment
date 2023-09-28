const express=require('express')



const {getDashboard,getpointages
    }=require('../services/dashboard');


    const router=express.Router();



router.route('/').get(getDashboard)
router.route('/pointage').get(getpointages)


module.exports = router;