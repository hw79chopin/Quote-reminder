const path = require('path');
const express = require('express');
const quoteController = require('../controllers/quote');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', quoteController.getIndex);

router.get('/quotes-list/:quoteId', quoteController.getQuote);

router.get('/quotes-list', quoteController.getQuotesList);

router.get('/add-quote', isAuth, quoteController.getAddQuote);

router.post('/add-quote', isAuth, quoteController.postAddQuote);

router.get('/edit-quote/:quoteId', isAuth, quoteController.getEditQuote);

router.post('/edit-quote', isAuth, quoteController.postEditQuote);

router.get('/search-quotes', isAuth, quoteController.getSearchQuotes);

module.exports = router;