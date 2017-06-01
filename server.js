var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var router = require("./config/router.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/dist", express.static(__dirname + "/src"));

app.use(router);

app.listen(3000, function (err, success) {
    err ? console.log("error") : console.log("starting...");
});