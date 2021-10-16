var express = require("express");
var whatsappRouter = require("./message");
var messagesRouter = require("./messages");
var phoneUsersRouter = require("./phoneUsers");

var app = express();

app.use("/message/", whatsappRouter);
app.use("/messages/", messagesRouter);
app.use("/phoneusers/", phoneUsersRouter);


module.exports = app;