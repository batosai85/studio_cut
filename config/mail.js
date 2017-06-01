var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');
var mailgun = require("./mailgun.js");

module.exports.sendMail = function(){
    return function (req, res) {
        
        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
        }
        // Put your secret key here.
        var secretKey = "6Ldz1CMUAAAAAIFziD0NL7GHi2JZKMQBsWwUYIEp";
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl,function(error,response,body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if(body.success !== undefined && !body.success) {
                return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
            }
            res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
        });
        
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
        res.send();
    }
}