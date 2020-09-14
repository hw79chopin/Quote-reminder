// Import modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const errorController = require('./controllers/error');
const errorController = require('./controllers/error');

// Setting App
const app = express();
const MONGODB_URI = 'URI'
app.set('view engine', 'ejs');
app.set('views', 'views');


// Importing Router
// const adminRoutes = require('./routes/admin');
const quoteRoutes = require('./routes/quote');
// const authRoutes = require('./routes/auth');

// Setting bodyparser and path
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
app.use(quoteRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("DB connected")
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
