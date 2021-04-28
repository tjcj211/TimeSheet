var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var cors = require('cors');
var {database} = require('./config');

var studentRouter = require('./routes/student');
//var professorRouter = require('./routes/professor');

var mongoose = require('mongoose');
const connectionParams = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};
var uri = 'mongodb+srv://dbuser:158skunkJR21!@cluster0.c0anp.mongodb.net/StudentSheet?retryWrites=true&w=majority';
//var uri = `mongodb+srv://${database.username}:${database.password}@${database.host}`;
var config = require('./config')
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;

mongoose
	.connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, connectionParams)
	.then(() => {
		console.log('Connected to database ');
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use('cors');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/student', studentRouter);
//app.use('/professor', professorRouter);

const account = require('./models/account');
app.use(passport.initialize());
passport.use(new LocalStrategy(account.authenticate()));
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

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
