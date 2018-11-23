/**
 * 
 */
'use strict'
var React = require('../jsonforms-react-seed/node_modules/react');
var ReactDOMServer = require('../jsonforms-react-seed/node_modules/react-dom/server');
class MyComponent extends React.Component {
	  render() {
	    return 'Hello World';
	  }
	}
	 
var box = ReactDOMServer.renderToString('<MyComponent />');
module.exports = box;