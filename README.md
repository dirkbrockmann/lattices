# 2-d Lattices

```lattice.js``` helps making 2-d square and hexagonal lattice objects with optional periodic boundary conditions, size and scale options and easy access to nodes, node neighbors and cell geometries. 

This can be useful for programming visualizations in d3. 

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

You can generate ***regular square*** lattices and ***hexagonal*** lattices, both either with periodic boundary conditions or not (Dirichlet boundaries). 

### Setting up lattices

#### Square Lattices

```js
var Sq = lattice.square()
```
creates a simple square lattice and stores it in ```Sq```. By default the lattice doesn't have periodic boundaries and has linear size L = 10. The (x,y)-coordinates of the lattice range from -L to L in both dimensions, so the number of nodes are (2L+1)^2. 

```js
var Sq = lattice.square(L)
```
creates a lattice of size L.

```js
var Sq = lattice.square(L).boundary("periodic")
```
creates a lattice of size L with periodic boundary conditions.

In the square lattices, each node has 6 neighbors when boundary conditions are periodic. When they are not the nodes on the borders have 4 neighbors, the nodes in the corners have 3.

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
creates a hex lattice of size L with periodic boundary conditions. Periodic boundary conditions are a bit tricky in hex lattices, but it can be worked out, see e.g. here: 

In the square lattices, each node has 6 neighbors when boundary conditions are periodic. When they are not the nodes on the borders have 4 neighbors, the nodes in the corners have 3.

```javascript
var inge = lattice.square(20).boundary("periodic")
```

```javascript
var dieter = lattice.square(20).boundary("dirichlet")
```

The fedault


## Nodes

## Scale

## Boundary Condition

## Cell

