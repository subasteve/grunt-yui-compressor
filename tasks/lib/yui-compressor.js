var Compressor = require('node-minify').minify;

exports.init = function(grunt) {

	return function(options) {
		var source = grunt.file.expand(options.source);
		var destination = options.destination;

		// Ugly hack to create the destination path automatically if needed
		if (!grunt.file.exists(destination)) {
			grunt.file.write(destination, '');
		}

		// Minify all the things!
		new Compressor({
			'type': 'yui-' + options.type,
			'fileIn': source,
			'fileOut': destination,
			'callback': function(error) {
				if (error) {
					grunt.warn(error);
					return options.fn();
				}
				grunt.log.writeln('File `' + destination + '` created.');
				// Let Grunt know the asynchronous task has completed
				options.fn();
			}
		});
	};
};
