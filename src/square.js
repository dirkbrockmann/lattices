// lattice.js

import {range,zip,filter} from "lodash-es";
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

const square = function(M){	
	
	var BoundaryConditions = "periodic";
	var L = 1;
	var Neighborhood = "n8";
	const N = 2*M+1;
	var dx = L / N;
	var dy = dx;
	
	const nodes = range(N*N).map(function(i){
		const pos = l2d(i,N)		
		return { 
			m:pos[0], 
			n: pos[1], 
			x: dx*(pos[0] + 0.5)-L/2, 
			y: dy*(pos[1] + 0.5)-L/2
		}
 	});		
	
 	nodes.forEach(function(d,i){
		d.neighbors=neighbors(i,N,BoundaryConditions,Neighborhood).map(x => nodes[x]);
		d.cell = () => {
			return 	[
				{x:d.x + dx / 2, y:d.y + dy / 2},
				{x:d.x - dx / 2, y:d.y + dy / 2},
				{x:d.x - dx / 2, y:d.y - dy / 2},
				{x:d.x + dx / 2, y:d.y - dy / 2},
				{x:d.x + dx / 2, y:d.y + dy / 2}
			]
		},
		d.random_interior_point = () => {
			return {
				x:d.x+dx*(Math.random()-0.5),
				y:d.y+dy*(Math.random()-0.5)
			}
		}
		
	});
	
	// methods
	
	const scale = function(s){
		if (typeof s !== "undefined") {
			nodes.forEach(function(d){d.x = (d.m + 0.5) * s / N -s/2 ,d.y = (d.n + 0.5) * s /N - s/2}) ; 
			L = s
			dx = L / N
			dy = L / N
			this.L=L
			return this; 
		} else {
			return L;
		}
	}
		
	const boundary = function(b){
		if (typeof b !== "undefined") {
			nodes.forEach(function(d,i){
				d.neighbors=neighbors(i,N,b,Neighborhood).map(x=>nodes[x]);
			})
			BoundaryConditions = b
			nodes.forEach(d=>{
				d.is_boundary = BoundaryConditions == "dirichlet" && (d.n==0 || d.n==2*M || d.m == 0 || d.m == 2*M)
			})
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
	
	const boundary_cells = function(){
		if (BoundaryConditions==="periodic") {
			return null;
		} else {
			return filter(nodes,n=>{return n.n==0 || n.n==2*M || n.m == 0 || n.m == 2*M})
		}	
	}
			
	return {
		type:"square",
		L: L,
		N: M,
		size:N*N,
		hood: hood,
		nodes: nodes,
		scale: scale,
		boundary: boundary,
		boundary_cells:boundary_cells
	}
}

export default square