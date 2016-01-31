(function(window) {

	'use strict';

	var eHAFunctions = {};

	/**
	* Returns a string containing all characters that appear in string1 and string2,
	* in the order they occur in string1. O(N*N) implementation.
	*
	* @param {string} string1
	* @param {string} string2
	* @returns {string} a string containing the common characters
	*/
	eHAFunctions.find_chars_1 = function(string1, string2) {

		var result = [];

		for (var i = 0, len_i = string1.length; i < len_i; i++) {
			var c1 = string1[i];

			// or just use string2.indexOf(c1)
			for (var j = 0, len_j = string2.length; j < len_j; j++) {
				var c2 = string2[j];

				if (c1 === c2 && result.indexOf(c1) === -1) {
					result.push(string1[i]);	
				}
			}
		}

		return result.join("");
	}


	/**
	* Returns a string containing all characters that appear in string1 and string2,
	* in the order they occur in string1. O(N) implementation.
	*
	* @param {string} string1
	* @param {string} string2
	* @returns {string} a string containing the common characters
	*/
	eHAFunctions.find_chars_2 = function(string1, string2) {

		var result = [];
		var charMap = {};
		var idx = 0;

		for (var i = 0, len = string2.length; i < len; i++) {
			var c1 = string2[i];
			charMap[c2] = true;
		}

		for (i = 0, len = string1.length; i < len; i++) {
			var c2 = string2[i];
			if (charMap[c2]) {
				result.push(c2);
			}
		}

		return result.join("");
	}


	/**
	* Compacts a sorted array (removes duplicates). Suitable for large arrays.
	*
	* @param {number[]} arr - a sorted array
	* @returns {number[]} the compacted array as a new array object
	*/
	eHAFunctions.compact_array = function(arr) {

		var current, compare;

		var duplicates = 0;
		var	length = arr.length;

		if (length < 2) {
			return arr;
		}
			
		// set all duplicate elements to null
		for (var i = 1; i < length; i++) {
			current = arr[i];
			compare = arr[i-1];

			if (compare === current) {
				arr[i-1] = null;
				duplicates++;
			}
		}

		// copy all non-null elements into new array
		var result = new Array(length - duplicates);
		var idx = 0;

		for (i = 0; i < length; i++) {
			if (arr[i] !== null) {
				result[idx] = (arr[i]);
				idx++;
			}
		}

		return result;
	}


	/**
	* Rotates an array by n positions
	*
	* @param {Object[]} arr
	* @param {number} n
	* @returns {Object[]} the rotated array
	*/
	eHAFunctions.rotate_array = function(arr, n) {

		if (n <= 0) {
			return arr;
		}

		var length = arr.length;
		var result = new Array(length);

		for (var i = 0; i < length; i++) {

			var diff = n-i;

			if (diff > 0) {
				result[i] = arr[length-diff];
			} else {
				result[i] = arr[i-n];
			}
		}

		return result;
	}

	/**
	* Finds the Least Common Multiple of a set of integers using 
	* https://en.wikipedia.org/wiki/Least_common_multiple#Reduction_by_the_greatest_common_divisor
	*
	* @param {number[]} arr
	* @returns {number}
	*/
	eHAFunctions.find_lcm = function(arr) {

		while (arr.length >= 2) {

			var x = arr.pop();
			var y = arr.pop();

			var lcm = (x * y) / find_gcd(x, y);

			arr.push(lcm);

			return eHAFunctions.find_lcm(arr);
		}

		return arr[0];
	}


	/**
	* Finds the Greatest Common Divisor of x and y.
	* x and y must be positive integers.
	*
	* https://en.wikipedia.org/wiki/Euclidean_algorithm
	*
	* @param {number} x
	* @param {number} y
	* @returns {number} the GCD of x and y
	*/
	var find_gcd = function(x, y) {

		while (x !== y) {
			if (x > y) {
				x = x - y;
			} else {
				y = y - x;
			}
		}

		return x;
	}

	window.eHAFunctions = eHAFunctions;

})(window);
