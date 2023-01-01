/* webpack.config.js */
const path = require('path');

module.exports = {
  entry: './src/lattice.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lattice.js',
	library: 'lattice' 
  },
};
