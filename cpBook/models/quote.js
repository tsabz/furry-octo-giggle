const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  name: { 
    type: String,
    default: 'unspecified'
  },
  body: { 
    type: String, 
    required: true
  },
  author: {
    type: String,
    default: 'unspecified'
  },
  image: String,
  tags: [String],
  public: {
    type: Boolean, 
    default: true
  },
  postedBy: Number,
}, {
  timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;