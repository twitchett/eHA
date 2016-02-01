(function(window, $) {

	'use strict';

	var eHAFunctions = window.eHAFunctions;

	var test_data = {

		'find_chars_1' : ['angularjs', 'backbonejs'],

		'find_chars_2' : ['angularjs', 'backbonejs'],

		'compact_array' : [[0,0,1,9,11,11,11,15,21,21,94]],

		'rotate_array' : [[1,2,3,4,5,6,7,8,9,0],4],

		'find_lcm' : [[12,49,296,16]]
	}

	for (var fn in eHAFunctions) {

		if (eHAFunctions.hasOwnProperty(fn)) {

			// find the arguments for the function
			var input = test_data[fn];

			// clone the DOM elements that will display the result
			var result = $($('.result')[0]).clone();

			// show title & input data on DOM
			result.find('.name').html(fn);
			result.find('.input').html('input: ' + input);

			// call the function, get the result
			var output = eHAFunctions[fn].apply(null, input);

			// add the output to the DOM
			result.find('.output').html('output: ' + output);
			result.appendTo('body');
		}
	}

})(window, jQuery)