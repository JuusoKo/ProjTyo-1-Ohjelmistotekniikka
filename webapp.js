var express = require('express');

var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(express.static('static'));

var routes = require("./static/api.js")(app);

var bugData = [
	{id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
	{id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
];

app.get('/api/tampere', function(req, res) {
	db.collection('etaisyydet').find({"Nimi":"Tamperes"}).toArray(function(err, docs){
		res.json(docs);
	});
});


MongoClient.connect('mongodb://localhost/etaisyydet', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
