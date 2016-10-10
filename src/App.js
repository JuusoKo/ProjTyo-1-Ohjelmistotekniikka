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
	//	$("#buttondiv").text(getData("tampere"));
	//	test();
	console.log("asd");
	ReactDOM.render(
		<div>Hello, world!</div>,
	     	document.getElementById('hellodiv')
	);

	$("#calcDistance").click(function() {
		console.log("pls");
		var start = $("#start option:selected").text();
		var goal = $("#goal option:selected").text();

		$.ajax({
				url: "/api/"+start+"/"+goal,
				success: function(response){
					console.log(response);

					$("#distanceDiv span").text("Etäisyys: " + response.cost + "km");
					return response;
				}
		});
	});
});
