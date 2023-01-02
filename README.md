# lattice

```lattice.js``` helps making 2-d symmetric square and hexagonal lattice objects with optional periodic boundary conditions, size and scale options and easy access to nodes, node neighbors and cell geometries. 

This can be useful for programming visualizations and agent based simulations in `d3js`. 

## Installation

```shell
git clone https://github.com/dirkbrockmann/lattice.git
```

Go to the directory `lattice`: 

```shell
cd lattice
```
Install package with `npm`:

```shell
npm install 
```

Build components with `npm`:
```shell
npm run build
```

### Run examples in `dist/examples`

```shell
npm run examples
```

## Usage

If you want to use a local (minified) copy of the bundle, use `dist/lattice.js` and include it like so in your `html`-file:

```html
<script src="lattice.js"></script>
```

If you want to use it as part of your own project as a module import `lattice` like so:

```js
import * as lattice from "lattice"
```

## Setting up a latttice

You can generate ***square*** and ***hexagonal*** lattices, both either with periodic boundary conditions or not (Dirichlet boundaries). 

### Square Lattice

```js
const N = 10
const sq = lattice.square(N)
```

creates a simple square lattice and stores it in `sq`. By default the lattice has periodic boundaries. $N$ is the linear half-size of the grid. The linear extent of the lattice is $2N+1$, and the number of nodes in the lattice is $(2N+1)^2$.

The default lattice fits into a square of spatial extent $LxL$ where $L=1$. $L$ is the spatial scale of the lattice and defaults to $1$.

The (x,y)-coordinates of the lattice range from -L to L in both dimensions, so the number of nodes are (2L+1)^2. 

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

