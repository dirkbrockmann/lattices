
const w = 300, h = 300;
		
var n2d = d3.format(".3f")

const nodeprops_square = ["Node_index","Number_of_neighbors","m","n","x","y"]
const nodeprops_hex = ["Node_index","Number_of_neighbors","l","m","n","x","y"]

// display lattice

display_example(lattices.square(5),"ex1")
display_example(lattices.hex(5),"ex2")
display_example(lattices.square(4).boundary("dirichlet"),"ex3")
display_example(lattices.hex(4).boundary("dirichlet"),"ex4")
display_example(lattices.square(6).hood("n4"),"ex5")
display_example(lattices.square(7).scale(10),"ex6")
display_example(lattices.hex(7).scale(10),"ex7")

function display_example(lat,target){

var props = _.toPairs({
			"N":lat.N,
			"Number of Nodes":lat.size,
			"Scale":lat.scale(),
			"Boundary":lat.boundary()
})
	
if (lat.type=="square"){
	props.push(["Neighborhood",lat.hood()])
}

var nodeprops = lat.type=="square" ? nodeprops_square : nodeprops_hex

lat.nodes.forEach(d=>{d.selected_as_neighbor=false})

const L = lat.L;

const X = d3.scaleLinear().domain([-L/2, L/2]).range([0, w]);
const Y = d3.scaleLinear().domain([-L/2, L/2]).range([0, h]);

const line = d3.line().x(d=>X(d.x)).y(d=>Y(d.y))
const svg = d3.select("#"+target+"_display").append("svg").attr("width",w).attr("height",h)

var cell = svg.selectAll(".cell").data(lat.nodes).enter().append("path")
	.attr("class",function(d){return d.selected_as_neighbor ? "ncell" : "cell" })
	.attr("d",function(d){
		return line(d.cell())
	})
	.on('mouseover', function(d,i) {
		d.neighbors.forEach(function(n){n.selected_as_neighbor=true})
		cell.attr("class",function(d){return d.selected_as_neighbor ? "ncell" : "cell" })
		d3.select(this).attr('class', 'cell_focus')
		nodeinfo.select("#Node_index").text(i)
		nodeinfo.select("#Number_of_neighbors").text(d.neighbors.length)
		if(lat.type=="hexagonal"){
			nodeinfo.select("#l").text(n2d(d.l))
		}
		nodeinfo.select("#n").text(n2d(d.n))
		nodeinfo.select("#m").text(n2d(d.m))
		nodeinfo.select("#x").text(n2d(d.x))
		nodeinfo.select("#y").text(n2d(d.y))
	})
	.on('mouseout', function(d) {
	    d3.select(this).attr('class', 'cell')
		d.neighbors.forEach(function(n){n.selected_as_neighbor=false})
		cell.attr("class",function(d){return d.selected_as_neighbor ? "ncell" : "cell" })
	});
	
var node = svg.selectAll(".node").data(lat.nodes).enter().append("g").attr("class","node")
	.attr("transform",d=>"translate("+X(d.x)+","+Y(d.y)+")")

var center = node.append("circle").attr("r",3).attr("class","center")

// table of properties

var info = d3.select("#"+target+"_info").append("div").attr("class","f5 fw5")
var nodeinfo = d3.select("#"+target+"_info").append("div").attr("class","f2 fw5 mt3")
	
var row1 = info.selectAll(".prop").data(props).enter().append("dl").attr("class","f5 lh-title mv2")

row1.append("dt").attr("class","dib b").text(d=>d[0]+":")
row1.append("dd").attr("class","dib ml2 gray").text(d=>""+d[1])

var row2 = nodeinfo.selectAll(".prop").data(nodeprops).enter().append("dl").attr("class","f5 lh-title mv1")

row2.append("dt").attr("class","dib b").text(d=>d.replaceAll("_", " ")+":")
row2.append("dd").attr("class","dib ml2 gray").text("").attr("id",d=>d)
}


