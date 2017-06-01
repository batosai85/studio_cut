var express = require("express");
var router = express.Router();
var path = require("path");/*
var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');
var mailgun = require("./mailgun.js");*/
var mail = require("./mail.js");

router.route("/")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname, '../', '/public/index.html'));
    })
    .post(mail.sendMail());
   /* function (req, res) {
   var auth = {
        auth: {
            api_key: mailgun.api_key
            , domain: mailgun.domain
        }
    }
    var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    nodemailerMailgun.sendMail({
        from: "'" + req.body.name + "' <" + req.body.email + ">"
        , to: ['veljkobatosai@gmail.com', 'bakayarorse@hotmail.com']
        , subject: '' + req.body.email
        , text: '' + req.body.message
    , }, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            console.log('Response: ' + info);
        }
    });
    res.send();*/

module.exports = router;