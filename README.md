# lattice

```lattice.js``` helps making 2-d square and hexagonal lattice objects with optional periodic boundary conditions, size and scale options and easy access to nodes, node neighbors and cell geometries. 

This can be useful for programming visualizations and agent based simulations in d3. 

## Installation

```shell
git clone https://github.com/dirkbrockmann/lattice.git
```

Include a local copy in your header like so:

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="lattice.js"></script>
```

## Usage

You can generate ***square*** and ***hexagonal*** lattices, both either with periodic boundary conditions or not (Dirichlet boundaries). 

### Setting up lattices

#### Square Lattices

```js
var Sq = lattice.square()
```
creates a simple square lattice and stores it in ```Sq```. By default the lattice doesn't have periodic boundaries and has linear size L = 10. The (x,y)-coordinates of the lattice range from -L to L in both dimensions, so the number of nodes are (2L+1)^2. 

You can pass an integer as a linear size argument:

```js
var Sq = lattice.square(L)
```
This creates a lattice of size L.

```js
var Sq = lattice.square(L).boundary("periodic")
```
creates a lattice of size L with periodic boundary conditions.

In square lattices, each node has 8 neighbors when boundary conditions are periodic. When they are not the nodes on the borders have 5 neighbors, the nodes in the corners have 3.

####  Hexagonal Lattices

```js
var Hx = lattice.hex()
```
creates a hexagonal lattice and stores it in ```Hx``` with non-periodic boundary conditions. The linear size L = 10.
2L+1 is the linear extent of the lattice, the distance between two opposing corners of the lattice. The number of nodes
in a hex lattice of linear size L is given by N = 1+3( L(L+1) ).

```js
var Hx = lattice.hex(L)
```
creates a hex lattice of size L.

```js
var Hx = lattice.hex(L).boundary("periodic")
```

creates a hex lattice of size L with periodic boundary conditions. Periodic boundary conditions are a bit tricky in hex lattices, but it can be worked out, see  [https://www.redblobgames.com/grids/hexagons/](https://www.redblobgames.com/grids/hexagons/).  

In hex lattices, each node has 6 neighbors when boundary conditions are periodic. When they are not the nodes on the borders have 4 neighbors, the nodes in the corners have 3.

### Lattice properties

Both, square and hex lattice have the following fields. Say you have defined a lattice ```G = lattice.hex()``` or ```G = lattice.square()``` then

-  ```G.L``` : returns its linear size 
-  ```G.N``` : returns the number of nodes
-  ```G.type``` : returns its type, i.e. "hexagonal" / "square"

### Nodes

Nodes can be accessed  by ```G.nodes```. Each node in the array has x and y coordinates and a neighbor array. e.g.

-  ```G.nodes[i].x``` : returns node i's x-coordinate 
-  ```G.nodes[i].y``` : returns node i's y-coordinate
-  ```G.nodes[i].neighbors``` : returns an array of all of i's neighbors

### Scale

```js
G.scale(s)
```
sets the spatial scale of the lattice to ```s```. The default value is 1. This effects the x and y coordinates of the nodes and their boundaries. Without argument, the current scale of ```G``` is returned.

### Boundary Condition

```js
G.boundary(["periodic"|"dirichlet"])
```
sets the type of boundary condition. Default is "dirichlet". Without an argument, returns the lattice's boundary type.

### Cell

The boundary of each node can be accessed by ```G.cell(node)```, which is useful for drawing nodes, e.g.

```js
var G = lattice.hex(20);
var points = G.cell(G.nodes[17]);
```

```points``` here contains an array of 7 points, each with x,y coordinates that define the hexagonal boundary of node 17. The function .cell() requires a node as an argument. 


