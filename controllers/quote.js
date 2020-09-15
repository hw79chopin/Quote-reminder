const { ConnectionStates } = require('mongoose');
const Quote = require('../models/quote');

exports.getIndex = (req, res, next) => {
  res.render('quote/index.ejs', {
    pageTitle: "Main Page",
    path: "/INDEX",
  })
};

exports.getQuotesList = (req, res, next) => {
  Quote.aggregate([{
    $sample: {
      size: 5
    }
  }])
    .then(quotes => {
      res.render('quote/quotes-list.ejs', {
        pageTitle: "Today's quotes",
        path: '/QUOTES',
        quotes: quotes
      });
    })
    .catch(err => console.log(err));
}; 

exports.getQuote = (req, res, next) => {
  const quoteId = req.params.quoteId;
  Quote.findById(quoteId)
    .then(quote => {
      res.render('quote/quote-detail', {
        pageTitle: "Quote detail",
        path: '/QUOTES',
        quote: quote
      });
    })
    .catch(err => console.log(err));
};