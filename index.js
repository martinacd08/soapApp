
var express = require('express'),
        app = express();

var session = require('express-session');
var bodyParser = require('body-parser');


app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

		
		
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



var sess = null;

app.get('/',function(req,res){
	res.sendFile(__dirname + '/UI/login.html');
});

app.post('/login',function(req,res){
	
	if(req.body.pass == 'pass' & req.body.email== 'user'){
		sess=req.body;
		res.end("ok")
		
	}
	else
	{
		res.end("Error")
	}
});

app.get('/admin',function(req,res){

		if(sess !=null)
		{
			res.sendFile(__dirname + '/UI/admin.html');
		}
		else
		{
		
			res.redirect('/');
		}


});


app.get('/acciones',function(req,res){

		if(sess !=null)
		{
			res.sendFile(__dirname + '/UI/acciones_sarai.html');
		}
		else
		{
		
			res.redirect('/');
		}


});

app.get('/logout',function(req,res){
	sess = null;
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});




app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});