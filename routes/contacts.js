const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const { check, validationResult } = require('express-validator');
const User = require('../models/User')
const Contact = require('../models/Contact');
const { findById } = require('../models/User');

// @route GET api/contacts
// @desc  Get all users contacts 
// @access Private
router.get('/',auth,async (req,res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg:'Erooro Server'})
    }
  

})

// @route POST api/contacts
// @desc  add contact 
// @access Private
router.post('/',[auth,[
    check('name', 'Champ Obligatoire').not().isEmpty(),
    
]], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
  }
  const {email,name,phone,type} = req.body
  try {
      const newContact = new Contact({
          name,
          email,
          phone,
          type,
          user: req.user.id 
      });
      const contact = await newContact.save()
      res.json(contact)
  } catch (error) {
      console.log(error.message)
      res.status(500).send('Error Server')
  }
})

// @route PUT api/contacts/:id
// @desc  Update contact
// @access Private
router.put('/:id',auth, async (req,res) => {
    const {email,name,phone,type} = req.body
    const contactFields = {}
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;


    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) {
            res.status(400).json({msg: 'Contact not found'})
        }
        
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {$set: contactFields},
            {new: true}
        )
        res.json(contact)
    } catch (error) {
        res.status(500).send('Server error')
    }
  

})

// @route DELETE api/contacts/:id
// @desc  Delete contact
// @access Private
router.delete('/:id',auth,async (req,res) => {
  try {
     let contact = Contact.findById(req.params.id)
     if(!contact){
         res.status(400).json({msg:'Contact not found'})
     }

     await Contact.findByIdAndRemove(req.params.id) 
     res.json({msg:'Contact deleted'})   
  } catch (error) {
      res.status(500).json({msg:'Error server'})
  }
})

module.exports = router