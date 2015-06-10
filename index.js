
var express = require('express'),
        app = express();


app.use(function(req, res, next) {
    res.setTimeout(500000, function() {
        console.log('Request has timed out.');
        res.send(408);
    });

    next();
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/UI'));
app.use(express.static(__dirname + '/UI/assets'));


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);


app.get('/', function(req, res) {
    res.sendfile(__dirname + '/UI/index.html');
});




app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});