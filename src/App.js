// var Graph = require('../node-dijkstra');
// var ReactDOM = require('../react-dom');
// var React = require('../react');
//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
/*MongoClient.connect(url, function(err, db){
	if (err){
		console.log(err);
	} else {
		console.log("Mongo done");
		// db actions
		db.close();
	}
});
*/
$(document).ready(function(){
	console.log("qweq");
	$("#buttondiv").text(getData("tampere"));
//	test();
});

function getData(haettavaKaupunki){
	console.log("getdata");
	$.ajax({
			url: "/api/"+haettavaKaupunki,
			success: function(response){
				console.log(response);
				return response;
			}
	});
}
console.log("asd");
ReactDOM.render(
	<div>Hello, world!</div>,
     	document.getElementById('hellodiv')
);
