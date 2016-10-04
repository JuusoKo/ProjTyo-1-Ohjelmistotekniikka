var express = require('express');

var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(express.static('static'));

var routes = require("./static/api.js")(app);

var bugData = [
	{id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
	{id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
];

app.get('/api/helsinki', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Helsinki"])
		res.json(docs["Helsinki"]);
	});
});

app.get('/api/turku', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Turku"])
		res.json(docs["Turku"]);
	});
});

app.get('/api/tampere', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Tampere"])
		res.json(docs["Tampere"]);
	});
});

app.get('/api/kuopio', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Kuopio"])
		res.json(docs["Kuopio"]);
	});
});
app.get('/api/jyvaskyla', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Jyväskylä"])
		res.json(docs["Jyväskylä"]);
	});
});
app.get('/api/kouvola', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Kouvola"])
		res.json(docs["Kouvola"]);
	});
});
app.get('/api/oulu', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Oulu"])
		res.json(docs["Oulu"]);
	});
});
app.get('/api/vaasa', function(req, res) {
	db.collection('etaisyydet').find({}).toArray(function(err, docs){
		docs = docs[0];
		console.log(docs["Vaasa"])
		res.json(docs["Vaasa"]);
	});
});


MongoClient.connect('mongodb://localhost:27017/etaisyydet', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
