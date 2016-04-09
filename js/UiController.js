(function() {

	'use strict';

	angular.module('app').controller('UiController', UiController);

	UiController.$inject = [
		'$rootScope',
		'$scope',
		'$location',
		'$interval',
		'$timeout',
		'$http'
	];

	function UiController(
		$rootScope,
		$scope,
		$location,
		$interval,
		$timeout,
		$http
	) {
		var vm = this;

		vm.right = right;
		vm.left = left;
		vm.jump = jump;

		vm.show = {
			nav: true,
			help: true
		};

		vm.slides = {
			all: [],
			current: 0,
			timer: []
		};

		vm.toggleScreensaver = toggleScreensaver;
		vm.toggleSound = toggleSound;
		vm.help = help;

		$rootScope.isMute = true;
		$rootScope.paused = false;

		$http.get('config.json').then(function(response) {
			vm.screensaver = response.data.screensaver;
			angular.forEach(response.data.projects, function(project) {
				if (!$rootScope.project[project.name]) {
					$rootScope.project[project.name] = {};
				}
				vm[project.name] = {};
				vm.slides.all.push(project.name);
				vm.slides.timer.push(project.timer);
			});
			init();
		});

		$scope.$on('slider:next', function() {
			next();
		});

		$scope.$on('slider:prev', function() {
			prev();
		});

		$scope.$on('slider:jump', function(event, slide) {
			jump(slide);
		});

		$scope.$on('video:ended', function() {
			if (!$rootScope.isTimerActive) {
				next();
			}
		});

		$scope.$on('help:show', function() {
			vm.show.help = true;
		});

		$scope.$on('help:hide', function() {
			vm.show.help = false;
		});

		$scope.$on('nav:show', function() {
			vm.show.nav = true;
		});

		$scope.$on('nav:hide', function() {
			vm.show.nav = false ;
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

		$scope.$on('timer:cancel', function() {
			cancelTimer();
		});

		function init() {
			$scope.$watch('vm.slides.current', function(index) {
				$location.path(vm.slides.all[vm.slides.current]);
				startTimer(index);
				if (index > -1) {
					$rootScope.project[vm.slides.all[index]].image = true;
				}
			});
		}

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
		}

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
		}

		function mute() {
			$rootScope.$broadcast('video:mute');
		}

		function unmute() {
			$rootScope.$broadcast('video:unmute');
		}

		function next() {
			vm.show.help = true;
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
			vm.show.help = true;
			vm.rtl = false;
			$timeout(function() {
				if (vm.slides.current <= 0) {
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

			if (vm.slides.current === slideNum) {
				startTimer(slideNum);
				if (slideNum > -1) {
					$rootScope.project[vm.slides.all[slideNum]].image = true;
				}
			}
		}

		function home() {
			jump(0);
		}

		function startTimer(index) {
			cancelTimer();
			$rootScope.isTimerActive = false;
			if (vm.slides.timer[index]) {
				$rootScope.isTimerActive = true;
				vm.timer = $timeout(
					function() {
						next();
						$rootScope.isTimerActive = false;
					}, vm.slides.timer[index] * 1000
				);
			}
		}

		function cancelTimer() {
			angular.forEach(vm.slides.all, function(project) {
				$timeout.cancel(vm.timer);
			});
		}

	}

})();
