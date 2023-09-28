const express=require('express')
const {getuserValidator,
      updateuserValidator,
      deleteuserValidator,
      createuserValidator,
      changeuserpasswordvalidate,
      forgetuserpasswordvalidate
       }=require('../utils/validators/userValidator');


const {getusers,
       createuser,
        getuser,
        updateuser,
        deleteuser,
        changeuserpassword,
        passwordrecovery,
        resizeImage,
        uploadUserImage,
        getusersByProject,
        getTechniciensLibre,
        getsuperviseur,getClient,getTechnicienByProject,updateMultipleTechnicien,getTechnicien
    }=require('../services/userService');


const router=express.Router();
router.route('/superviseur').get(getsuperviseur)
router.route('/client').get(getClient)
router.route('/techniciens/:id').get(getTechnicienByProject)
router.route('/techniciens').get(getTechnicien)


router.put('/changepassword/:id',changeuserpasswordvalidate,changeuserpassword);
router.route('/').get(getusers)
                 .post(uploadUserImage,resizeImage,createuserValidator,createuser)
                 .put(forgetuserpasswordvalidate,passwordrecovery);
router.route('/project/:id').get(getusersByProject)
router.route('/technicienslibre').get(getTechniciensLibre)
router.route('/updatemultipetechnicien/:id').put(updateMultipleTechnicien)


router.route('/:id').get(getuser)
                    .put(updateuserValidator,updateuser)
                    .delete(deleteuserValidator,deleteuser);

module.exports = router;