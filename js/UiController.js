(function() {

	'use strict';

	angular.module('app').controller('UiController', UiController);

	function UiController($rootScope, $scope, $location, $interval, $timeout, $http) {
		var vm = this;

		vm.right = right;
		vm.left = left;
		vm.jump = jump;

		vm.show = {
			nav: true,
			help: true,
		};

		vm.precisioneffect = {
			image: true,
			cta: precisioneffect
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
				'precisioneffect',
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
			$timeout.cancel(vm.precisioneffect.timer);
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
			$timeout.cancel(vm.precisioneffect.timer);
		}

		function mute() {
			$rootScope.$broadcast('video:mute');
		}

		function unmute() {
			$rootScope.$broadcast('video:unmute');
		}

		$scope.$on('slider:next', function() {
			next();
		});

		$scope.$on('slider:prev', function() {
			prev();
		});

		$scope.$on('slider:jump', function(data, slide) {
			jump(slide);
		});

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
				vm.precisioneffect.timer = $timeout(function() {
					next();
				}, 10000);
			} else {
				vm.precisioneffect.image = true;
				$timeout.cancel(vm.precisioneffect.timer);
			}
		});

		$scope.$watch('vm.precisioneffect.image', function(newVal) {
			if (!newVal) {
				$timeout.cancel(vm.precisioneffect.timer);
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

		function precisioneffect() {
			vm.show.help = false;
			vm.show.nav = false;
			vm.precisioneffect.image = false;
		}

		$scope.$watch('vm.slides.current', function() {
			$location.path(vm.slides.all[vm.slides.current]);
		});
	}

})();
