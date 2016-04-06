(function() {

	'use strict';

	angular.module('app').directive('videoControls', videoControls);

	angular.module('app').directive('help', help);

	angular.module('app').directive('screensaver', screensaver);

	function videoControls($rootScope) {
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

	function help($rootScope) {
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

	function screensaver($rootScope) {
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
