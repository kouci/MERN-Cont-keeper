const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User')

// @route POST api/users
// @desc  Register a user
// @access Public 
router.post('/',[
   check('email', 'champ obligatoire').isEmail(),
   check('name', 'Cahmp obligatoire').not().isEmpty(),
   check('password','mot de passe doit dépasser 6 caractères').isLength({min :6})
],
 async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
  }
  const {email, name, password} = req.body

  try {
   let user = await User.findOne({email})
   if(user){
      res.status(400).json({msg : 'utilisateur existe déja'})
   }

   user = new User({email,name,password})
   // save in database 
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password,salt)

   await user.save()
   
   const payload = {
      user: {
         id: user.id
      } 
         
   }
   jwt.sign(payload,config.get('jwtSecret'),{
      expiresIn : 360000
   }, (err, token) => {
      if(err) throw err
      res.json({token})
   })


  } catch (error) {
     res.status(500).json({msg : "Server Error "})
  }

}
   
)

module.exports = router