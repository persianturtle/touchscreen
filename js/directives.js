(function() {

	'use strict';

	angular.module('app').directive('lmVideoControls', lmVideoControls);

	angular.module('app').directive('lmVideoRemove', lmVideoRemove);

	angular.module('app').directive('lmHelp', lmHelp);

	angular.module('app').directive('lmScreensaver', lmScreensaver);

	function lmVideoControls($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				var video = element[0];
				element.bind('click', function() {
					if (video.paused) {
						video.play();
					} else {
						video.pause();
					}
				});

				element.bind('ended', function() {
					$rootScope.$broadcast('video:ended');
				});

				scope.$on('video:mute', function() {
					video.muted = true;
				});

				scope.$on('video:unmute', function() {
					video.muted = false;
				});

				if ($rootScope.isMute) {
					video.muted = true;
				} else {
					video.muted = false;
				}
			}
		};
	}

	function lmVideoRemove($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				var video = element[0];
				scope.$on('video:remove', function() {
					element.remove();
				});
			}
		};
	}

	function lmHelp($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				element.bind('click', function() {
					$rootScope.paused = false;
					$rootScope.$broadcast('help:exited');
				});
			}
		};
	}

	function lmScreensaver($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				element.bind('click', function() {
					$rootScope.paused = false;
					$rootScope.$broadcast('screensaver:exited');
				});
			}
		};
	}

})();
