var cors = require('cors');
var bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var path = require('path');

var auth  = require('./routes/auth');
var index = require('./routes/index');
var news  = require('./routes/news');

var app = express();


// initialize main.js
var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');

app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));
app.use(bodyParser.json());

// TODO: remove this after project is done
app.use(cors());
// avoid CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();  // if don't have next(), the response is over in here
// });



app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);


app.use('/', index);
app.use('/auth', auth);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404 Not Found');
});


module.exports = app;
