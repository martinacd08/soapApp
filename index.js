
var express = require('express'),
    app     = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/UI'));
app.use(express.static(__dirname + '/UI/assets'));


app.get('/index', function(req, res) {
	res.sendfile(__dirname + '/UI/index.html');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});