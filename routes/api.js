var express = require("express");
var whatsappRouter = require("./whatsapp");
var messagesRouter = require("./messages");
var phoneUsersRouter = require("./phoneUsers");
var contentsRouter = require("./contents");
var rulesRouter = require("./rules");
var broadcastRouter = require("./broacast");

var app = express();

app.use("/message/", whatsappRouter);
app.use("/messages/", messagesRouter);
app.use("/phoneusers/", phoneUsersRouter);
app.use("/contents/", contentsRouter);
app.use("/rules/", rulesRouter);
app.use("/broadcast/", broadcastRouter);


module.exports = app;