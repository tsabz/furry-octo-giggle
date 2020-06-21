const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(
  {
   firstname: req.body.firstname,
   lastname: req.body.lastname,
   password: req.body.password,
   username: req.body.username
  }, (err, createdUser) => {
    if (err){
      res.send(err)
    } else {
      res.json(createdUser)
    }
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
