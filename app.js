const express = require('express');
var bodyParser = require('body-parser')
const chalk = require('chalk'); // for coloring output
const debug = require('debug')('app'); // for output in debug mode
const morgan = require('morgan'); // for HTTP logging
const dotenv = require('dotenv');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
dotenv.config();
const path = require('path');
var apiRouter = require("./routes/api");
var authRouter = require("./routes/auth");
var dbUtil = require("./helpers/dbUtil")


// DB connection
var MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/";
var MONGODB_DB = process.env.MONGODB_DB || "testdb"

console.log("Mongo DB connection string ", MONGODB_URL);
console.log("Mongo DB database ", MONGODB_DB);

dbUtil.connectToServer(MONGODB_URL, MONGODB_DB, function( err ) {
	if (err) {
		console.error("App starting error:", err.message);
        process.exit(1);
	}
});

const PORT = process.env.PORT || 5454; //get environment variable passed from package.json
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // specify directory for web pages
// parse application/json
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({secret: 'secretValue'}));

require('./src/config/passport.js')(app);
app.set('views', './src/views'); // setup template file location and engin
app.set('view engine', 'ejs')


//Route Prefixes
app.use("/api/", apiRouter);
app.use("/auth", authRouter);

/*
app.use((req,res,next) => {
	if(req.user) {
		next();
	} else {
		res.redirect('auth/signIn');
	}
});
*/

app.get('/', (req, res) => {
    res.render('index', {title: 'TurnTheBus Virtual Assistant Portal', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug(`Listening to ${chalk.green(PORT)}`);
});