// lattice.js

import {range,zip} from "lodash-es";
import d2l from "./d2l.js"
import l2d from "./l2d.js"

const hoods = {
	"n4" : zip([-1,1,0,0],[0,0,-1,1]),
	"n8" : zip([-1,0,1,1,1,0,-1,-1],[-1,-1,-1,0,1,1,1,0])
}

function neighbors(k,n,bc="periodic",hoodtype="n8"){
	
	const neigh=[];
	hoods[hoodtype].forEach( z => {

		var j = z[1]
		var i = z[0]
		
		const p = l2d(k,n),
			x = p[0], y = p[1],
			a = x + i, b = y + j;
		if (bc == "dirichlet" ? 
			!(j == 0 && i==0) && a<n && b < n && a>=0 && b>=0 : 
			!(j == 0 && i==0)) {
				neigh.push(n*((b+n)%n)+(a+n)%n);
			}
	})
	
	return neigh;
}

const square_simple = function(N){	
	
	var BoundaryConditions = "periodic";
	var L = N;
	var Neighborhood = "n8";
	
	const nodes = range(N*N).map(function(i){
		const pos = l2d(i,N)		
		return { 
			x:pos[0], 
			y:pos[1], 
		}
 	});		
	
 	nodes.forEach(function(d,i){
		d.neighbors=neighbors(i,N,BoundaryConditions,Neighborhood).map(x => nodes[x]);
		d.cell = () => {
			return 	[
				{x:d.x, y:d.y},
				{x:d.x + 1, y:d.y},
				{x:d.x + 1, y:d.y + 1},
				{x:d.x, y:d.y + 1},
				{x:d.x, y:d.y}
			]
		}
	});
	
	// methods
	
	const scale = function(s){
		return N;
	}
		
	const boundary = function(b){
		if (typeof b !== "undefined") {
			nodes.forEach(function(d,i){
				d.neighbors=neighbors(i,N,b,Neighborhood).map(x=>nodes[x]);
			})
			BoundaryConditions = b
			return this;
		} else {
			return BoundaryConditions;
		}
	}
	
	const hood = function(h){
		if (typeof h !== "undefined") {
			nodes.forEach(function(d,i){
				d.neighbors=neighbors(i,N,BoundaryConditions,h).map(x=>nodes[x]);
			})
			Neighborhood = h
			return this;
		} else {
			return Neighborhood;
		}
	}
			
	return {
		type:"square",
		L: L,
		N: N,
		size:N,
		hood: hood,
		nodes: nodes,
			scale: scale,
		boundary: boundary
	}
}

export default square_simple