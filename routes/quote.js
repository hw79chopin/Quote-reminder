const path = require('path');

const express = require('express');

const quoteController = require('../controllers/quote');
// const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', quoteController.getIndex);

router.get('/quotes-list', quoteController.getQuotesList);

module.exports = router;
