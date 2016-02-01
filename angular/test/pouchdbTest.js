(function() {

	'use strict';

	// The wrapped functions fail because the $q promises are never resolved, despite calling $scope.$apply()
	// However the original functions (using the Promise api) work...

	var testUser = {
			_id  : 	'id',
			name : 	'Tabi',
			type : 	'JS Developer'
		}

	describe('PouchDB put (wrapped)', function() {

		var pouchDB, $scope, db, promiseHandler;
		
		beforeEach(module('app'));

		beforeEach(inject(function($rootScope, _pouchDB_, _pouchService_) {
			$scope = $rootScope;
			pouchDB = _pouchDB_; 
			promiseHandler 	= {
				success		: jasmine.createSpy('success'),
				error		: jasmine.createSpy('error'),
				failure		: jasmine.createSpy('failure'),
				finally 	: jasmine.createSpy('finally')
			}
		}));

		// create and destroy database before each test

		beforeEach(function() {
			db = new pouchDB('db1');
		})

		// like the put function, the promise does not resolve
		// afterEach(function(done) {
		// 	db.destroy().then(done);
		// })

		it('returns a $q promise', function(done) { 

			expect(promiseHandler.success).not.toHaveBeenCalled();
			expect(promiseHandler.error).not.toHaveBeenCalled();
			expect(promiseHandler.failure).not.toHaveBeenCalled();
			expect(promiseHandler.finally).not.toHaveBeenCalled();

			// test
			var promise = db.put(testUser)
				.then(promiseHandler.success, promiseHandler.error)
				.catch(promiseHandler.failure)
				.finally(promiseHandler.finally);

			// trigger digest cycle to resolve $q promises - but it doesn't work...
			$scope.$apply();

			// assert

			// $q promises are instances of object
			expect(promise instanceof Promise).toBe(false);

			// these fail
			expect(promiseHandler.success).toHaveBeenCalled();
			expect(promiseHandler.error).not.toHaveBeenCalled();
			expect(promiseHandler.failure).not.toHaveBeenCalled();
			expect(promiseHandler.finally).toHaveBeenCalled();
		});

	});

	// The original function (just for comparison)

	describe('PouchDB put (original)', function() {

		var db, promiseHandler;
		
		beforeEach(module('app'));

		beforeEach(function() {
			db = new PouchDB('db');

			promiseHandler 	= {
				success		: jasmine.createSpy('success'),
				error		: jasmine.createSpy('error'),
				failure		: jasmine.createSpy('failure'),
				finally 	: jasmine.createSpy('finally')
			}
		});

		afterEach(function(done) {
			db.destroy().then(done);
		})

		it('returns a Promise object', function(done) { 

			expect(promiseHandler.success).not.toHaveBeenCalled();
			expect(promiseHandler.error).not.toHaveBeenCalled();
			expect(promiseHandler.failure).not.toHaveBeenCalled();

			// test
			var promise = db.put(testUser)
				.then(promiseHandler.success, promiseHandler.error)
				.catch(promiseHandler.failure);

			// assert
			expect(promise instanceof Promise).toBe(true);

			promise.then(function() {
				expect(promiseHandler.success).toHaveBeenCalled();
				expect(promiseHandler.error).not.toHaveBeenCalled();
				expect(promiseHandler.failure).not.toHaveBeenCalled();
				done();
			});

		});

	});

})();