const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  index: {
    type: String,
    required: false,
    trim: true
  },
  excerpt_date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  quote: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
},
{
  versionKey: false,
  strict: false
});

module.exports = mongoose.model('quote', quoteSchema);