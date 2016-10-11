var React = require('react');
var Dropdown = require('react-simple-dropdown');
var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;


var CustomDropdown = React.createClass({
		getInitialState: function() {
				return {
						listVisible: false,
						display: "",
						selected: this.props.list[0],
				};
		},

		select: function(item) {
			console.log(item);
			this.setState({ selected: item});
			console.log(this.state.selected);
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
		key: 1
}, {
		name: "Helsinki",
		key: 2
}, {
		name: "Vaasa",
		key: 3
},{
		name: "Kuopio",
		key: 4
},{
		name: "Jyväskylä",
		key: 5
},{
		name: "Oulu",
		key: 6
},{
		name: "Kouvola",
		key: 7
},{
		name: "Turku",
		key: 8
}];

ReactDOM.render(<CustomDropdown list={cities} /*selected={cities[0]}*/ />, document.getElementById("start-dropdown"));
ReactDOM.render(<CustomDropdown list={cities} /*selected={cities[1]}*/ />, document.getElementById("goal-dropdown"));

var resetCanvas = function(){
	$.ajax({
		url: "/locations",
		success: function(response){
			var locArr = $.map(response, function(el) { return el });
			console.log(locArr);
			var canvas = document.getElementById('myCanvas');
			var context = canvas.getContext('2d');
			locArr.forEach(function(city){
				context.beginPath();
				context.arc(city.x, city.y, 10, 0, Math.PI*2, true);
				context.closePath();
				context.fillStyle = "red";
				context.fill();
			});
		}
	});
}

$(document).ready(function(){

	ReactDOM.render(
		<div>Hello, world!</div>,
	     	document.getElementById('hellodiv')
	);
	console.log("JUMALITA")


	// ReactDOM.render(
	// 	startElement,
	// 	document.getElementById('start-dropdown')
	// );

	// ReactDOM.render(
	// 	goalElement,
	// 	document.getElementById('goal-dropdown')
	// );

	$("#calcDistance").click(function() {
		console.log("pls");
		// var start = $("#start-dropdown option:selected").text();
		// var goal = $("#goal-dropdown option:selected").text();

		var start = $("#start-dropdown").children(".dropdown-container").children(".dropdown-display").children("span").text();
		var goal =  $("#goal-dropdown").children(".dropdown-container").children(".dropdown-display").children("span").text();
		console.log(start + " " + goal);
		$.ajax({
				url: "/api/"+start+"/"+goal,
				success: function(response){
					console.log(response);

					$("#distanceDiv span").text("Etäisyys: " + response.cost + "km");
					if(response.path !== null) {
						response.path.forEach(function(city){
							console.log(city);
							$("#routeDiv").append('<span>' +  " " + city + " " + '</span>');
						});
					}

					return response;
				}
		});
	});

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var imageObj = new Image();

	imageObj.onload = function() {
		context.drawImage(imageObj, 0, 0, 682, 950);
	};
	imageObj.src = 'finland.jpg';

	resetCanvas();
});
