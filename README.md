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

creates a simple square lattice and stores it in `sq`.  $N$ is the linear half-size of the lattice. Along each dimension the lattice has $2N+1$ nodes, the total number of nodes is therefore $(2N+1)^2$.

By default the lattice has periodic boundaries.

By default the lattice has a spatial scale $L=1$, so it fits into a square of spatial dimensions $L\times L$. So by default size of a node patch is ($dx\times dy$) with $dx=dy=(L/(2N+1))$. 

The (x,y)-coordinates of the lattice range from -L/2 to L/2 in both dimensions:

$$x=-L/2+dx/2+n\\, dx$$

$$y=-L/2+dy/2+m\\, dy$$

with $n,m=0,...,2N$.


###  Hexagonal Lattices

```js
const N = 10
const hx = lattice.hex(N) 
```

creates a hexagonal lattice stores it in `hx`. $2*N+1$ is the number of nodes along the horizontal axis. The total number of nodes in the network is $1+3N(N+1)$.

By default the lattice has periodic boundaries. Periodic boundary conditions are a bit tricky in hex lattices, but it can be worked out, see  [https://www.redblobgames.com/grids/hexagons/](https://www.redblobgames.com/grids/hexagons/).  

By default the lattice has a spatial scale $L=1$, so it fits into a rectangle of spatial dimensions $L\times \sqrt{3}L/2$. Each patch is a hexagon with a corner to corner distance $dx=(L/(2N+1))$.

### Lattice properties

Both, **square** and **hexagonal** lattice have the following property fields. Say you have defined a lattice `G = lattice.hex(10)` or `G = lattice.square(10)` then

- `G.N` : is the linear node range $N$ (in this case 10)
- `G.size` : is the number of nodes in the lattice
- `G.L`: the linear physical extent
- `G.type` : returns its type, i.e. "hexagonal" / "square"

#### Nodes

Nodes can be accessed  by `G.nodes`. Each node in the array has x and y coordinates and a list of neighbors array. e.g.

-  `G.nodes[i].x` : returns node i's x-coordinate 
-  `G.nodes[i].y` : returns node i's y-coordinate
-  `G.nodes[i].neighbors` : returns an array of all of i's neighbors
-  `G.nodes[i].cell()`: returns a list of coordinates to draw the nodes cell

### Scale

```js
G.scale(s)
```

sets the spatial scale of the lattice to `s`. The default value is 1. This effects the x and y coordinates of the nodes and their boundaries. 

Without argument, the current scale of `G` is returned.

### Boundary Condition

```js
G.boundary(["periodic"|"dirichlet"])
```
sets the type of boundary condition. Default is "periodic". For `dirichlet` the nodes on the boundary
have a different number of neighbors.

Without an argument, returns the lattice's boundary type.

### Square lattice `n8` and `n4` neighborhoods

For a square lattice you can chose a node's neighborhood to have a neighborhood of the 8 surrounding lattice nodes or only the 4 nodes corresponding to above, below, left and right. Like so

```js
const sq = lattice.square(10).hood("n4")
```

or 

```js
const sq = lattice.square(10).hood("n8")
```

Without arguments `hood()` returns the neighborhood type.

