
var npm = require('./node/node_modules/npm');

npm.load(function(err) {
  // handle error
  // install module ffi
	
  npm.commands.install('./tmp/mininodeserver',['browserify','literalify','concat-files','react-redux','redux','react',
	  											'react-dom-factories','create-react-class'], function(er, data) {
	  console.log(er,data);
  });

  npm.on('log', function(message) {
    // log installation progress
    console.log(message);
  });
});