var express = require("express");
var router = express.Router();
var path = require("path");
var mail = require("./mail.js");

router.route("/")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname, '../', '/public/index.html'));
    })
    .post(mail.sendMail());

module.exports = router;