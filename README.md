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


```js
var Sq = lattice.square()
```
creates a simple square lattice and stores it in ```Sq```. By default the lattice doesn't have periodic boundaries and has size $L=10$

```javascript
var horst = lattice.square()
```

```javascript
var horst = lattice.hex(10)


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

