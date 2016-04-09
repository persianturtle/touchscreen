(function() {

	'use strict';

	angular.module('app').run(precisioneffect);

	precisioneffect.$inject = ['$rootScope'];

	function precisioneffect($rootScope) {
			
		$rootScope.project = {
			precisioneffect: {
				image: true,
				cta: cta
			}
		};

		function cta() {
			$rootScope.$broadcast('timer:cancel');
			$rootScope.$broadcast('help:hide');
			$rootScope.$broadcast('nav:hide');
			$rootScope.project.precisioneffect.image = false;
		}

	}

})();
