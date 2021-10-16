var express = require("express");
 var messageRouter = require("./message");
 var phoneUsersRouter = require("./phoneUsers");

var app = express();

app.use("/message/", messageRouter);
app.use("/phoneusers/", phoneUsersRouter);


module.exports = app;