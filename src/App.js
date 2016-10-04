var Graph = require('node-dijkstra');
var ReactDOM = require('react-dom');
var React = require('react');
//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/etaisyydet";
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
	test();
});
function test(){
	var route = new Graph();
	route.addNode('A', { B: 1, C: 2});
	route.addNode('B', { A: 1});
	route.addNode('C', { A: 2});
	console.log(route.path('B', 'C', { cost: true }));
}
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
