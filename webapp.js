var express = require('express');
var browserify = require('browserify-middleware');
const Graph = require('node-dijkstra');

var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(express.static('static'));

app.get('/bundle.js', browserify(['react', 'react-dom', 'react-simple-dropdown']));

app.get('/api/:start/:goal', function(req, res) {
		db.collection('etaisyydet').find({}).toArray(function(err, docs){
			distances = docs[0];
			delete distances._id;
			console.log(distances);
			const route = new Graph(distances);
			console.log(route);
			res.json(route.path(req.params.start.toString(), req.params.goal.toString(), {cost: true}));
		});
});

MongoClient.connect('mongodb://localhost:27017/etaisyydet', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
