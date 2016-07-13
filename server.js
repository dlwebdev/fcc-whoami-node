var express = require('express');
var app = express();
var os = require('os');
var useragent = require('express-useragent');

var port = process.env.PORT || 8080;

// I can get the IP address, language and operating system for my browser.
// {"ipaddress":"104.139.46.215","language":"en-US","software":"X11; Linux x86_64"}

app.use(useragent.express());

app.get('/api/whoami/', function (req, res) {
    var usersIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var lang = req.headers["accept-language"].split(",")[0];
    var ua = req.useragent;
    var uaString = ua.source;
    var usersOS = uaString.substring(uaString.indexOf("("), uaString.indexOf(")") + 1);
    
    var outputObject = {"ipaddress":usersIP, "language":lang,"software":usersOS};
    
    res.send(outputObject);
});

app.get('/api/', function (req, res) {
    res.send("API currently only has 'whoami' endpoint...");
});

app.get('/', function (req, res) {
    res.send("to access whoami app visit: /api/whoami/");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});