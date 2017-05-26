/* globals __dirname */
/* jshint node:true  */

/**
 * See the file "LICENSE" for the full license governing this code.
 *
 * @author Dale "Ducky" Lotts
 * @since 9/11/16.
 */

var path = require('path')

module.exports = {
  entry: [path.join(__dirname, 'app.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
