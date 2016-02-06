/* jshint node:true  */

module.exports = {
	entry: ['./test/commonjs/webpack/app.js'],
	output: {
		path: __dirname,
		filename: 'bundle.js'
	}
};
