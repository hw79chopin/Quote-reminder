const { fileLoader } = require('ejs');
const { ConnectionStates } = require('mongoose');
const product = require('../../../practice/Section15 ver3.0/models/product');
const Quote = require('../models/quote');

exports.getIndex = (req, res, next) => {
  res.render('quote/index', {
    pageTitle: "Main Page",
    path: '/'
  })
};
 
exports.getQuotesList = (req, res, next) => {
  Quote.aggregate([{
    $sample: {
      size: 5
    }
  }])
    .then(quotes => {
      res.render('quote/quotes-list', {
        pageTitle: "Today's quotes",
        quotes: quotes,
        path: '/quotes-list'
      });
    })
    .catch(err => console.log(err));
}; 

exports.getQuote = (req, res, next) => {
  const quoteId = req.params.quoteId;
  Quote.findById(quoteId)
    .then(quote => {
      const quoteObject = quote.toObject();
      res.render('quote/quote-detail', {
        pageTitle: "Quote detail",
        quote: quoteObject,
        path: '/quote-detail'
      });
    })
    .catch(err => console.log(err));
}; 


exports.getAddQuote = (req, res, next) => {
  res.render('quote/addEdit-quote.ejs', {
    pageTitle: 'Add quote',
    editing: false,
    path: '/add-quote'
  }) 
};

exports.postAddQuote = (req, res, next) => {
  const date = new Date();
  const source = req.body.source;
  const title = req.body.title;
  const quote = req.body.quote;
  const speaker = req.body.speaker;
  const user = req.user;
  
  console.log('여기는 성공했니?')
  const newQuote = new Quote({
    excerpt_date: date,
    source: source,
    title: title,
    quote: quote,
    speaker: speaker,
    userId: user,
  });
  newQuote
    .save()
    .then(result => {
      console.log('Quote added');
      res.redirect('/quotes-list');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditQuote = (req, res, next) => {
  const quoteId = req.params.quoteId;
  Quote.findById(quoteId)
    .then(quote => {
      const quoteObject = quote.toObject();
      res.render('quote/addEdit-quote.ejs', {
        pageTitle: 'Edit quote',
        editing: true,
        quote: quoteObject,
        path: '/add-quote'
    })
  })
  .catch(err => console.log(err));
};

exports.postEditQuote = (req, res, next) => {
  const quoteId = req.body.quoteId;
  const newSoure = req.body.source.trim();
  const newTitle = req.body.title.trim();
  const newQuote = req.body.quote.trim();
  const newSpeaker = req.body.speaker.trim();
  const newSoureLength = newSoure.length === 0;
  const newTitleLength = newTitle.length === 0;
  const newSpeakerLength = newSpeaker.length === 0;

  Quote
    .updateOne({ _id: quoteId }, {
      $set: {
        source: newSoureLength ? null : newSoure,
        title: newTitleLength ? null : newTitle,
        quote: newQuote,
        speaker: newSpeakerLength ? null : newSpeaker,
      }
    })
    .then(result => {
      console.log("Quote Updated");
      res.redirect('/quotes-list/' + quoteId)
    })
    .catch(err => console.log(err));
};

exports.getSearchQuotes = (req, res, next) => {
  res.render('quote/search-quotes.ejs', {
    pageTitle: "Search quotes",
    quotes: [],
    path: '//search-quotes'
  })
};
