const express = require('express');
const chalk = require('chalk'); // for coloring output
const debug = require('debug')('app'); // for output in debug mode
const morgan = require('morgan'); // for HTTP logging
const path = require('path');

const PORT = process.env.PORT || 5454; //get environment variable passed from package.json
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // specify directory for web pages

app.set('views', './src/views'); // setup template file location and engin
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index', {title: 'TurnTheBus Virtual Assistant', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug(`Listening to ${chalk.green(PORT)}`);
});