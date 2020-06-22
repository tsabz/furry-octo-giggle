const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const Quote = require('../models/quote');

////GETS ALL QUOTES FOR CURRENT USER
router.get('/quotes', (req, res) => {
 Quote.find({postedBy:  req.session.user._id}, (err, foundQuotes) => {
   res.json(foundQuotes)
 })
})

//LOGIN FUNCTION
router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if (error){
      res.json(error)
    }
    if(foundUser === null){
      res.json({
        errorMessage: 'User Does Not Exist'
      });
    } else {
      const pwMatch = bcrypt.compareSync(req.body.password, foundUser.password);
      if(pwMatch){
        req.session.user = foundUser
        res.json(foundUser)
      } else {
        res.json({
          errorMessage: 'Password Incorrect'
        });
      }
    }
  })
})

//DESTROY SESSION
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({
      destroyed: true
    })
  })
})

module.exports = router;
