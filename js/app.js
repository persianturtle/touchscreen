(function() {

	'use strict';

	angular.module('app', ['ngRoute', 'ngTouch', 'ngAnimate']);

	angular.module('app').controller('UiController', UiController);

	angular.module('app').directive('lmVideoControls', lmVideoControls);

	angular.module('app').directive('lmVideoRemove', lmVideoRemove);

	angular.module('app').directive('lmHelp', lmHelp);

	angular.module('app').directive('lmScreensaver', lmScreensaver);

	function UiController($rootScope, $scope, $location, $interval, $timeout, $http) {
		var vm = this;

		vm.right = right;
		vm.left = left;
		vm.jump = jump;

		vm.show = {
			nav: true,
			help: true,
		};

		vm.lehmanmillet = {
			isImageOverlay: true
		};

		$http.get('config.json').then(function(response) {
			vm.screensaver = response.data.screensaver;
		});

		vm.toggleScreensaver = toggleScreensaver;
		vm.toggleSound = toggleSound;
		vm.help = help;

		$rootScope.isMute = true;
		$rootScope.paused = false;

		vm.slides = {
			all: [
				'lehmanmillet',
				'infinity',
				'hypoxia',
				'cologuard',
				'beseengetscreened'
			],
			current: 0
		};

		function left() {
			prev();
		}

		function right() {
			next();
		}

		function toggleScreensaver() {
			vm.slides.current = -1;
			$rootScope.paused = true;
			$location.path('screensaver');
			vm.show.help = false;
			vm.show.nav = false;
			$timeout.cancel(vm.lehmanmillet.timer);
		}2

		function toggleSound() {
			if ($rootScope.isMute) {
				unmute();
			} else {
				mute();
			}
			$rootScope.isMute = !$rootScope.isMute;
		}

		function help() {
			vm.slides.current = -1;
			$rootScope.paused = true;
			$location.path('help');
			vm.show.help = false;
			$timeout.cancel(vm.lehmanmillet.timer);
		}

		function mute() {
			$rootScope.$broadcast('video:mute');
		}

		function unmute() {
			$rootScope.$broadcast('video:unmute');
		}

		$scope.$on('video:ended', function() {
			next();
		});

		$scope.$on('help:exited', function() {
			vm.show.help = true;
			home();
		});

		$scope.$on('screensaver:exited', function() {
			vm.show.help = true;
			vm.show.nav = true;
			home();
		});

		$scope.$watch('vm.slides.current', function(newVal) {
			if (newVal === 0) {
				vm.lehmanmillet.isImageOverlay = true;
				vm.lehmanmillet.timer = $timeout(function() {
					next();
				}, 10000);
			} else {
				$timeout.cancel(vm.lehmanmillet.timer);
			}
		});

		function next() {
			vm.rtl = true;
			$timeout(function() {
				if (vm.slides.current === vm.slides.all.length - 1) {
					vm.slides.current = 0;
				} else {
					vm.slides.current++;
				}
			}, 10);
		}

		function prev() {
			vm.rtl = false;
			$timeout(function() {
				if (vm.slides.current === 0) {
					vm.slides.current = vm.slides.all.length - 1;
				} else {
					vm.slides.current--;
				}
			}, 10);
		}

		function jump(slideNum) {
			if (vm.slides.current > slideNum) {
				vm.rtl = false;
			} else {
				vm.rtl = true;
			}
			$timeout(function() {
				vm.slides.current = slideNum;
			}, 10);
			vm.show.help = true;
		}

		function home() {
			jump(0);
		}

		function auto() {
			vm.slides.interval = $interval(function() {
				next();
			}, 10000);
		}

		$scope.$watch('vm.slides.current', function() {
			$location.path(vm.slides.all[vm.slides.current]);
		});
	}

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
