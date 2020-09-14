// const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('quote/index.ejs', {
    pageTitle: "Today's quote",
    path: "/INDEX",
  })
};

exports.getQuotesList = (req, res, next) => {
  res.render('quote/quotes-list.ejs', {
    pageTitle: "Today's quotes",
    path: '/MORE'
  })
};