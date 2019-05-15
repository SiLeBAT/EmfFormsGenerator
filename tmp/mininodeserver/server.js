browserify = require('browserify'),
literalify = require('literalify'),
fs = require('fs')
var filePath = './tmp/mininodeserver/bundle.js';
var concat = require('concat-files');
var outStream = fs.createWriteStream(filePath);

var b = browserify().add('./tmp/mininodeserver/browser.js').transform(
		literalify.configure({})).bundle();

//b.pipe('./tmp/mininodeserver/prefix.js')
var stream = b.pipe(outStream);
stream.on('finish', function () {
	concat([
		  './tmp/mininodeserver/prefix.js',
		  './tmp/mininodeserver/bundle.js',
		  './tmp/mininodeserver/suffix.js'
		], '../FSK-Lab/de.bund.bfr.knime.fsklab.nodes/js-src/de/bund/bfr/knime/fsklab/nodes/joiner/emfbundle/bundle.js', function(err) {
		  if (err) throw err
		  console.log('Bundle is produced and written to /FSK-Lab/de.bund.bfr.knime.fsklab.nodes/js-src/de/bund/bfr/knime/fsklab/nodes/joiner/emfbundle/bundle.js ');
		});

});




