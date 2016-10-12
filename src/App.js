var Graph = require('node-dijkstra');

var CustomDropdown = React.createClass({
		getInitialState: function() {
				return {
						listVisible: false,
						display: "",
						selected: this.props.list[0],
				};
		},

		select: function(item) {
			this.setState({ selected: item});
		},

		show: function() {
				this.setState({ listVisible: true });
				document.addEventListener("click", this.hide);
		},

		hide: function() {
				this.setState({ listVisible: false });
				document.removeEventListener("click", this.hide);
		},

		render: function() {
				return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
						<div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
								<span>{this.state.selected.name}</span>
								<i className="fa fa-angle-down"></i>
						</div>
						<div className="dropdown-list">
								<div>
										{this.renderListItems()}
								</div>
						</div>
				</div>;
		},

		renderListItems: function() {
				var items = [];
				for (var i = 0; i < this.props.list.length; i++) {
						var item = this.props.list[i];
						items.push(<div onClick={this.select.bind(null, item)}>
								<span>{item.name}</span>
								<i className="fa fa-check"></i>
						</div>);
				}
				return items;
		}
});

var cities = [{
		name: "Tampere",
}, {
		name: "Helsinki",
}, {
		name: "Vaasa",
},{
		name: "Kuopio",
},{
		name: "Jyväskylä",
},{
		name: "Oulu",
},{
		name: "Kouvola",
},{
		name: "Turku",
}];


ReactDOM.render(<CustomDropdown list={cities} /*selected={cities[0]}*/ />, document.getElementById("start-dropdown"));
ReactDOM.render(<CustomDropdown list={cities} /*selected={cities[1]}*/ />, document.getElementById("goal-dropdown"));

var resetCanvas = function(){
	$.ajax({
		url: "/locations",
		success: function(response){
			var locArr = $.map(response, function(el) { return el });
			var canvas = document.getElementById('myCanvas');
			var context = canvas.getContext('2d');
			locArr.forEach(function(city){
				context.beginPath();
				context.arc(city.x, city.y, 10, 0, Math.PI*2, true);
				context.closePath();
				context.fillStyle = "red";
				context.fill();
				context.font="20px Georgia";
				context.fillText(city.name,city.x+10,city.y+10);
			});
		}
	});
}

var drawRoutes = function(){

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	// Helsinki - Tampere
	context.beginPath();
	context.moveTo(260, 825);
	context.lineTo(200,700);
	context.stroke();

	// Helsinki - Turku
	context.beginPath();
	context.moveTo(260, 825);
	context.lineTo(120,775);
	context.stroke();

	// Helsinki - Kouvola
	context.beginPath();
	context.moveTo(260, 825);
	context.lineTo(425,750);
	context.stroke();

	// Turku - Tampere
	context.beginPath();
	context.moveTo(120, 775);
	context.lineTo(200,700);
	context.stroke();

	// Tampere - Jyväskylä
	context.beginPath();
	context.moveTo(200, 700);
	context.lineTo(341,580);
	context.stroke();

	// Tampere - Vaasa
	context.beginPath();
	context.moveTo(200, 700);
	context.lineTo(125,475);
	context.stroke();

	// Kuopio - Jyväskylä
	context.beginPath();
	context.moveTo(500, 490);
	context.lineTo(341,580);
	context.stroke();

	// Kuopio - Oulu
	context.beginPath();
	context.moveTo(500,490);
	context.lineTo(321,200);
	context.stroke();

	// Jyväskylä - Oulu
	context.beginPath();
	context.moveTo(341, 580);
	context.lineTo(321,200);
	context.stroke();

	// Jyväskylä - Kouvola
	context.beginPath();
	context.moveTo(341, 580);
	context.lineTo(425,750);
	context.stroke();

	// Oulu - Vaasa
	context.beginPath();
	context.moveTo(321, 200);
	context.lineTo(125,475);
	context.stroke();

}



$(document).ready(function(){

	ReactDOM.render(
		<div>Hello, world!</div>,
	     	document.getElementById('hellodiv')
	);


	$("#calcDistance").click(function() {


		var start = $("#start-dropdown").children(".dropdown-container").children(".dropdown-display").children("span").text();
		var goal =  $("#goal-dropdown").children(".dropdown-container").children(".dropdown-display").children("span").text();
		$.ajax({
				url: "/api/"+start+"/"+goal,
				success: function(response){

					$("#distanceDiv span").text("Etäisyys: " + response.cost + "km");
					if(response.path !== null) {
						$("#routeDiv").text("");
						response.path.forEach(function(city){
							$("#routeDiv").append('<span>' +  " " + city + " " + '</span>');
						});
					}

					return response;
				}
		});
	});

	resetCanvas();
	drawRoutes();
});
