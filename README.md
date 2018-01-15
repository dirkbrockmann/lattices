# 2D Square and Hexagonal Lattices

```lattice.js``` helps making 2-d square and hexagonal lattices with optional periodic boundary conditions, size and scale options and cell geometries in d3. 

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

you can generate regular square lattices and hexagonal latticess, both either with periodic boundary conditions or

#### ```var horst = lattice.hex()```

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

