/* webpack.config.js */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lattices.js',
	library: 'lattices' 
  },
};
