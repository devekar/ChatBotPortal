const express = require('express');
var bodyParser = require('body-parser')
const chalk = require('chalk'); // for coloring output
const debug = require('debug')('app'); // for output in debug mode
const morgan = require('morgan'); // for HTTP logging
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");


// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
console.log("Mango DB connection string ", MONGODB_URL);
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

const PORT = process.env.PORT || 5454; //get environment variable passed from package.json
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // specify directory for web pages

app.set('views', './src/views'); // setup template file location and engin
app.set('view engine', 'ejs')


//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);
app.get('/', (req, res) => {
    res.render('index', {title: 'TurnTheBus Virtual Assistant', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug(`Listening to ${chalk.green(PORT)}`);
});