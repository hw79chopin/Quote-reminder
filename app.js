// Import modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/error');
const User = require('./models/user');
const csrf = require('csurf');
const flash = require('connect-flash');


// Setting App
const MONGODB_URI = 'Mongodb_URI'
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views');


// Importing Routers
const quoteRoutes = require('./routes/quote');
const authRoutes = require('./routes/auth');


// Setting bodyparser, path, flash
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());


// 로그인 여부 확인한 다음에 request에 user 붙여주기
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// 모든 views에 csrfToken을 추가하는 방법!
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Routers
app.use(quoteRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// DB 연결 후 로컬과 연결하기
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("*".repeat(20),"DB connected", "*".repeat(20))
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
