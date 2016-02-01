(function(){
	
	'use strict';

	angular.module('app', ['pouchdb'])

		// simple service to test pouchDB function
		.factory('pouchService', ['pouchDB', function(pouchDB) {	

			var myDB = new pouchDB('myDB');

			return {

				addUser : function addUser(user) {

					return myDB.put(user)
						.then(function(data) {
							console.log('success', data);
							return response;
						}, function(err) {
							console.error('err', err);
							throw err;
						})
						.catch(function(ex) {
							console.error('ex', ex);
							throw ex;
						})
						.finally(function() {
							console.log('finally');
						});
					}
			}
		}])

		// simple controller to test pouchDB function
		.controller('pouchController', ['$scope', 'pouchService', function($scope, pouchService) {

			var user = {
				_id  : 	'id',
				name : 	'Tabi',
				type : 	'JS Developer'
			}

			pouchService.addUser(user).then(function(data) {
				$scope.result = data;
			}, function(error) {
				$scope.result = error;
			});

		}])
})();

