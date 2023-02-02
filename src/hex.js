// lattice.js

import {range}  from "lodash-es";

const b1 = [1,0], b2 = [0.5,Math.sqrt(3)/2];

const u = [
			{l:1,m:0,n:-1},
			{l:1,m:-1,n:0},
			{l:0,m:-1,n:1},
			{l:0,m:1,n:-1},
			{l:-1,m:0,n:1},
			{l:-1,m:1,n:0}
];

const tri = [
			[u[0],u[1]],
			[u[1],u[2]],
			[u[2],u[4]],
			[u[4],u[5]],
			[u[5],u[3]],
			[u[3],u[0]]
];

function hexid(d){
	return "id_l"+(d.l)+"m"+(d.m)+"n"+(d.n);
}


const hex = function(N){
	var BoundaryConditions = "periodic";
	var L = 1;
	var dx = L / (2*N+1);			
	const nodes = [];
	const lookup = {};
			
	range(-N,N+1).forEach(function(i){
		range(-N,N+1).forEach(function(j){
			range(-N,N+1).forEach(function(k){
					if (i+j+k == 0) {
						nodes.push({l:i,m:j,n:k, 
							x: dx*i*b1[0]+dx*j*b2[0], 
							y: dx*i*b1[1]+dx*j*b2[1]})
					}
			})
		})	
	})
		
	nodes.forEach(function(d){
		lookup[hexid(d)]=d;
		d.cell = () => {
			const D = 1.0/Math.sqrt(3);			
			return [
				{x:d.x + dx / 2, y: d.y + D * dx / 2},
				{x:d.x, y:d.y + D * dx},
				{x:d.x - dx / 2, y:d.y + D * dx / 2},
				{x:d.x - dx / 2, y:d.y - D * dx / 2},
				{x:d.x, y:d.y - D * dx},
				{x:d.x + dx / 2, y:d.y - D * dx / 2},
				{x:d.x + dx / 2, y:d.y + D * dx / 2}
			]		
		}
	})

	if (BoundaryConditions==="periodic") {
		periodic(nodes)
	} else {
		dirichlet(nodes)
	}	
	
		
	const scale = function(s){
		if (typeof s !== "undefined") {
			L = s;
			dx = L / (2*N+1);
			nodes.forEach(d=>{
				d.x=dx*d.l*b1[0]+dx*d.m*b2[0];
				d.y=dx*d.l*b1[1]+dx*d.m*b2[1]
			}) 
			this.L = L;
			return this; 
		} else {
			return L;
		}
	}
		
	const cell = function(point){
			var D = 1.0/Math.sqrt(3);			
			return [
				{x:point.x + Scale / N / 2, y:point.y + D / 2 * Scale / N },
				{x:point.x, y:point.y + D * Scale / N},
				{x:point.x - Scale / N / 2, y:point.y  + D / 2 * Scale / N},
				{x:point.x - Scale / N / 2, y:point.y  -  D / 2 * Scale / N},
				{x:point.x, y:point.y - D * Scale / N},
				{x:point.x + Scale / N / 2, y:point.y - D / 2 * Scale / N },
				{x:point.x + Scale / N / 2, y:point.y + D / 2 * Scale / N }
			]
	}
		
	const boundary = function(s){
			if (typeof s !== "undefined") {
				if(s=="dirichlet"){
					BoundaryConditions = "dirichlet";
			   	 	dirichlet(nodes);
					
				} else {
					BoundaryConditions = "periodic";					
			   	 	periodic(nodes);
					
				}
				return this;
			} else {
				return BoundaryConditions;
			}
	}
					
	return {
		type:"hexagonal",
		L:L,
		N:N,
		size:1+3*N*(N+1),
		nodes: nodes,
		scale: scale,
		boundary: boundary,
		cell:cell
	}
	
	function dirichlet(p){
	
		p.forEach(function(d){
			d.neighbors = [];
			u.forEach(function(n){
				const hix = hexid ({l:(d.l+n.l),m:(d.m+n.m),n:(d.n+n.n)});
				const nn = lookup[hix]
				if (typeof nn !== 'undefined') {
					d.neighbors.push(nn)
				} 
			})

		})
	
		p.forEach(function(d){
			d.triangles = [];
			tri.forEach(function(n){
				const v1 = hexid({l:(d.l+n[0].l),m:(d.m+n[0].m),n:(d.n+n[0].n)});			
				const v2 = hexid({l:(d.l+n[1].l),m:(d.m+n[1].m),n:(d.n+n[1].n)});
				if (typeof lookup[v1] !== 'undefined' && typeof lookup[v2] !== 'undefined') {
					d.triangles.push([lookup[v1],lookup[v2]])
				} 
			})
		})	
	}	
	function periodic(p){
		p.forEach(function(d){
			d.neighbors = [];
			u.forEach(function(n){
				var nn = hexid ({l:(d.l+n.l),m:(d.m+n.m),n:(d.n+n.n)});					
				if (typeof lookup[nn] === 'undefined') {
					if (d.l+n.l==N+1 && Math.abs(d.m+n.m)<=N+1 && Math.abs(d.n+n.n)<=N) {
						nn = hexid ({l:(d.l+n.l-(2*N+1)),m:(d.m+n.m+(N+1)),n:(d.n+n.n+N)});
					}
					if (d.l+n.l==-(N+1) && Math.abs(d.m+n.m)<=N+1 && Math.abs(d.n+n.n)<=N) {
						nn = hexid ({l:(d.l+n.l+(2*N+1)),m:(d.m+n.m-(N+1)),n:(d.n+n.n-N)});
					}
					if (d.m+n.m==N+1 && Math.abs(d.l+n.l)<=N && Math.abs(d.n+n.n)<=N+1) {
						nn = hexid ({m:(d.m+n.m-(2*N+1)),n:(d.n+n.n+(N+1)),l:(d.l+n.l+N)});
					}
					if (d.m+n.m==-(N+1) && Math.abs(d.l+n.l)<=N && Math.abs(d.n+n.n)<=N+1) {
						nn = hexid ({m:(d.m+n.m+(2*N+1)),n:(d.n+n.n-(N+1)),l:(d.l+n.l-N)});
					}
					if (d.n+n.n==N+1 && Math.abs(d.l+n.l)<=N+1 && Math.abs(d.m+n.m)<=N) {
						nn = hexid ({n:(d.n+n.n-(2*N+1)),l:(d.l+n.l+(N+1)),m:(d.m+n.m+N)});
					}
					if (d.n+n.n==-(N+1) && Math.abs(d.l+n.l)<=N+1 && Math.abs(d.m+n.m)<=N) {
						nn = hexid ({n:(d.n+n.n+(2*N+1)),l:(d.l+n.l-(N+1)),m:(d.m+n.m-N)});
					}
				}
				d.neighbors.push(lookup[nn])
			})
		})
			
		p.forEach(function(d){
			d.triangles = [];
			tri.forEach(function(n){
				var edges = []
				n.forEach(function(x,i){
					var edge = hexid ({l:(d.l+x.l),m:(d.m+x.m),n:(d.n+x.n)});
					if (typeof lookup[edge] === 'undefined'){
						if (d.l+x.l==N+1 && Math.abs(d.m+x.m)<=N+1 && Math.abs(d.n+x.n)<=N){
							var nuck = hexid ({l:(d.l+x.l-(2*N+1)),m:(d.m+x.m+(N+1)),n:(d.n+x.n+N)});
						}
						if (d.l+x.l==-(N+1) && Math.abs(d.m+x.m)<=N+1 && Math.abs(d.n+x.n)<=N) {
							var nuck = hexid ({l:(d.l+x.l+(2*N+1)),m:(d.m+x.m-(N+1)),n:(d.n+x.n-N)});
						}
						if (d.m+x.m==N+1 && Math.abs(d.l+x.l)<=N && Math.abs(d.n+x.n)<=N+1) {
							var nuck = hexid ({m:(d.m+x.m-(2*N+1)),n:(d.n+x.n+(N+1)),l:(d.l+x.l+N)});
						}
						if (d.m+x.m==-(N+1) && Math.abs(d.l+x.l)<=N && Math.abs(d.n+x.n)<=N+1) {
							var nuck = hexid ({m:(d.m+x.m+(2*N+1)),n:(d.n+x.n-(N+1)),l:(d.l+x.l-N)});
						}
						if (d.n+x.n==N+1 && Math.abs(d.l+x.l)<=N+1 && Math.abs(d.m+x.m)<=N) {
							var nuck = hexid ({n:(d.n+x.n-(2*N+1)),l:(d.l+x.l+(N+1)),m:(d.m+x.m+N)});
						}
						if (d.n+x.n==-(N+1) && Math.abs(d.l+x.l)<=N+1 && Math.abs(d.m+x.m)<=N) {
							var nuck = hexid ({n:(d.n+x.n+(2*N+1)),l:(d.l+x.l-(N+1)),m:(d.m+x.m-N)});
						}
					}
					edges[i]=edge
				})
				d.triangles.push([lookup[edges[0]],lookup[edges[1]]])								
			})
		})
	}

	
}

export default hex