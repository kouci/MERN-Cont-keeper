const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const config = require('config')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs');
const User = require('../models/User')

// @route POST api/auth
// @desc  Auth user & get token
// @access Public 
router.post('/',[
    check('email','champ obligatoire').isEmail(),
    check('password','mot de passe obligatoire').exists()
], async (req,res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
   }
   const {email,password} = req.body
   try {
       let user = await User.findOne({email}) 
       
       if(!user){
           res.status(400).json({msg:'email existe pas '})
       }
       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch){
           res.status(400).json({msg : 'mot de passe incorrecte'})
       }
       // else 
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
    res.status(500).send({msg:'Server Error'})
   }
})

// @route Get api/auth
// @desc get logged in user
// @access Private
router.get('/',auth, async(req,res) => {
  try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
  } catch (error) {
      console.log(error.message)
      res.status(500).send({msg:'Server Error'})
  }
})

module.exports = router