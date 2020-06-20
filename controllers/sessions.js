const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if (error){
      res.json(error)
    }
    if(foundUser === null){
      res.json({
        message: 'user not found'
      });
    } else {
      const pwMatch = bcrypt.compareSync(req.body.password, foundUser.password);
      if(pwMatch){
        req.session.user = foundUser
        res.json(foundUser)
      } else {
        res.json({
          message: 'pw not found'
        });
      }
    }
  })
})

module.exports = router;
