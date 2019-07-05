var npm = require('./node/node_modules/npm');
var myConfigObject = {"https-proxy":"https://webproxy.bfr.bund.de:8080",
					  "http-proxy": "http://webproxy.bfr.bund.de:8080"}
npm.load(myConfigObject,function(err) {

	
	
	npm.commands.install('./tmp/mininodeserver', [ 'browserify', 'literalify',
			'concat-files', 'react-redux', 'redux', 'react',
			'react-dom-factories', 'create-react-class' ], function(er, data) {
		console.log(er, data);
	});

	npm.on('log', function(message) {
		// log installation progress
		console.log(message);
	});
});