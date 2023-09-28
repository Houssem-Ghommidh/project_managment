const express=require('express')
const {gettacheValidator,
      updatetacheValidator,
      deletetacheValidator,
      createtacheValidator,
      
       }=require('../utils/validators/tacheValidator');


const {gettaches,
       createtache,
        gettache,
        updatetache,
        deletetache,
       createFilterObj,
       resizeTacheImages,
       uploadTacheImages,
       getTacheByIdProject
    }=require('../services/tacheService');


const router=express.Router();

router.route('/').get(gettaches)
                 .post(createtache)
router.route('/project/:id').get(getTacheByIdProject)

router.route('/:id').get(gettacheValidator,gettache)
                    .put(updatetacheValidator,updatetache)
                    .delete(deletetacheValidator,deletetache);

module.exports = router;