const express = require('express')
const router = express.Router();

// @route GET api/contacts
// @desc  Get all users contacts 
// @access Private
router.get('/', (req,res) => {
    res.send('get all contacts')
})

// @route POST api/contacts
// @desc  add contact 
// @access Private
router.post('/', (req,res) => {
    res.send('add contact')
})

// @route PUT api/contacts/:id
// @desc  Update contact
// @access Private
router.put('/:id', (req,res) => {
    res.send('update contact')
})

// @route DELETE api/contacts/:id
// @desc  Delete contact
// @access Private
router.delete('/:id', (req,res) => {
    res.send('update contact')
})

module.exports = router