const path = require('path');

const express = require('express');

const quoteController = require('../controllers/quote');
// const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', quoteController.getIndex);

router.get('/quotes-list/:quoteId', quoteController.getQuote);

router.get('/quotes-list', quoteController.getQuotesList);

router.get('/add-quote', quoteController.getAddQuote);

router.post('/add-quote', quoteController.postAddQuote);

router.get('/edit-quote/:quoteId', quoteController.getEditQuote);

router.post('/edit-quote', quoteController.postEditQuote);

router.get('/search-quotes', quoteController.getSearchQuotes);

module.exports = router;