/* webpack.config.js */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lattices.js',
	globalObject: 'this',
	library: {
	    name: 'lattices',
	    type: 'umd',
	},
  },
};
