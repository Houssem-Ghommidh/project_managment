const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const usermodel=require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const nodemailer = require("nodemailer");


// @desc    signup
// @route   GET /api/auth/signup
// @access  Public
exports.signup=asyncHandler(async(req,res,next)=>{
// 1- Create user
const user = await usermodel.create({
    last_name:req.body.last_name,
    first_name:req.body.first_name,
    email:req.body.email,
    role:req.body.role,
    password: req.body.password,
  });

  // 2- Generate token
  const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRE_TIME
  });

  res.status(201).json({ data: user, token });
});
// @desc    Login
// @route   GET /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await usermodel.findOne({ email: req.body.email });
  
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(new ApiError('Incorrect email or password', 401));
    }
    // 3) generate token
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE_TIME
      });
  
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
  });


// @desc    RÉCUPÉRATION DE MOT DE PASSE
// @route   GET /api/auth/passwordrecovery
// @access  Public
exports.sendEmail=(req,res,next)=> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dzagence.responsable@gmail.com',
      pass: 'tganrframyvwatfc',
    },
  });
  
 const mail_configs = {
      from:"dzagence.responsable@gmail.com",
      to:req.body.email,
      subject: "RÉCUPÉRATION DE MOT DE PASSE",
      html: `<!DOCTYPE html>
              <html lang="en" >
              <head>
                <meta charset="UTF-8">
                <title>RÉCUPÉRATION DE MOT DE PASSE</title>
                
              </head>
              <body>
              <!-- partial:index.partial.html -->
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Bonjour,</p>
                  <p>Utilisez l'OTP suivant pour terminer votre procédure de récupération de mot de passe. OTP est valide pendant 5 minutes</p>
                  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${req.body.OTP}</h2>
                  <hr style="border:none;border-top:1px solid #eee" />
                </div>
              </div>
              <!-- partial -->
                
              </body>
              </html>`,
      };
      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          return  next(new ApiError(error,404)); 
        }
        return res.status(200).json({
          success: true,
          data: 'Email sent',
        });
      });
  }