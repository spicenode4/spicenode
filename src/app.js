//' Requires Generales
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//' Requires de rutas
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');

//' Ejecucion funcion global de Express
var app = express();

//' Setup del View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); //' Para poder leer JSON
app.use(express.urlencoded({ extended: false })); //' Para poder leer JSON
app.use(cookieParser());

//* Defino la carpeta Publica
app.use(express.static(path.join(__dirname, '..', '/public')));

//* Uso de los enrutadores
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
