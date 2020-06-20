const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//This ALL needs to be tested via postman! Need the dotenv file in order to access the Atlas instance locally -MR
//GET
router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  })
})

//CREATE
router.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err){
      res.send(err)
    }
    res.json(createdUser)
  })
})

//UPDATE
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate({_id: req.params.id}, req.body, (err, updatedUser) => {
    res.json(updatedUser)
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    res.json(deletedUser)
  })
})


module.exports = router;
