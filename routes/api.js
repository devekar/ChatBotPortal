var express = require("express");
 var messageRouter = require("./message");

var app = express();

app.use("/message/", messageRouter);

module.exports = app;