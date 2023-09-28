const express=require('express')
const {signupValidator,
       loginValidator,
       EnvoyerEmailValidator
       }=require('../utils/validators/authValidator');


const {signup,
      login,
      sendEmail
    }=require('../services/authService');


const router=express.Router();


router.route('/signup').post(signupValidator,signup);
router.route('/login').post(loginValidator,login);
router.route('/passwordrecovery').post(EnvoyerEmailValidator,sendEmail);

module.exports = router;