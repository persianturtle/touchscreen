(function() {

'use strict';

angular
	.module('app')
	.config(config);

config.$inject = ['$locationProvider', '$routeProvider'];

function config($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false);
	$routeProvider
		.when('/:project', {
			templateUrl: function(params) {
				return 'projects/' + params.project + '/project.html';
			}
		})
	;
}

})();
