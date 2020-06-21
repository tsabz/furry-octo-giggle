const express = require('express');
const router = express.Router();
const Quote = require('../models/quote.js');



// *** ROUTES *** //

// GET //

router.get('/', (req, res)=>{
  Quote.find({}, (err, foundQuote)=>{
    res.json(foundQuote);
  });
});

// POST //
router.post('/', (req, res)=>{
  Quote.create(req.body, (err, createdQuote)=>{
    console.log("The req.body is ", req.body);
    
    res.json(createdQuote);
  });
});

// DELETE //
router.delete('/:id', (req, res)=>{
  Quote.findByIdAndRemove(req.params.id, (err, deletedQuote)=>{
    res.json(deletedQuote);
  });
});

// UPDATE //
router.put('/:id', (req, res)=>{
  Quote.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedQuote)=>{
    res.json(updatedQuote)
  });
});


module.exports = router;
