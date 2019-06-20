var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');


// routes vars
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tokensRouter = require('./routes/tokens')
var pacienRouter = require('./routes/pacientes') //nuevo
var visitMedRouter = require('./routes/visitamedica') //nuevo
var consulRouter = require('./routes/consultorio') //nuevo
var histRouter = require('./routes/historial') //nuevo
var citaRouter = require('./routes/citas') //nuevo
var expeRouter = require('./routes/expedientes') //nuevo

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enable cors
app.use(cors());

// endpoints
app.use('/', indexRouter);
app.use('/tokens', tokensRouter);
app.use('/users', usersRouter);
app.use('/paciente', pacienRouter); //nuevo
app.use('/visitamedica', visitMedRouter); //nuevo
app.use('/consultorio', consulRouter); //nuevo
app.use('/hitsorial', histRouter); //nuevo
app.use('/citas', citaRouter); //nuevo
app.use('/expedientes', expeRouter); //nuevo


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
