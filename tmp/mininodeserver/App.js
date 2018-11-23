//require('babel-polyfill');
var React = require('react'),
reactDomFactories = require('react-dom-factories'),
jsonformreact = 		 require('@jsonforms/react'),
react_redux = require('react-redux'),
connect = react_redux.connect;
DOM = reactDomFactories.DOM, div = reactDomFactories.div, button = reactDomFactories.button, ul = reactDomFactories.ul, li = reactDomFactories.li

var createReactClass = require('create-react-class'),
 JsonForms= jsonformreact.JsonForms

module.exports = createReactClass({
 
  render: function() {
	  var form = React.createFactory(JsonForms);
	  var x = div({className:'demoform'},form());
	  return x;
		    
   
  }
})
