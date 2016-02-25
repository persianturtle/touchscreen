(function() {
	'use strict';

	angular.module('app', ['ngRoute', 'ngTouch', 'ngAnimate']);

	angular.module('app').controller('UiController', UiController);

	angular.module('app').directive('lmVideoControls', lmVideoControls);

	angular.module('app').directive('lmVideoRemove', lmVideoRemove);

	function UiController($rootScope, $scope, $location, $interval, $timeout) {
		var vm = this;

		vm.right = right;
		vm.left = left;
		vm.jump = jump;

		vm.nav = true;

		vm.isLehmanVideoPlaying = true;

		vm.viewingLehmanMilletSite = viewingLehmanMilletSite;

		vm.slides = {
			all: ['lehmanmillet', 'infinity', 'hypoxia', 'cologuard', 'beseengetscreened'],
			current: 0
		};

		function left() {
			prev();
		}

		function right() {
			next();
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

		$scope.$watch('vm.slides.current', function(newVal) {
			if (newVal === 0) {
				vm.isLehmanVideoPlaying = true;
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
		}

		function auto() {
			vm.slides.interval = $interval(function() {
				next();
			}, 10000);
		}

		$scope.$watch('vm.slides.current', function() {
			$location.path(vm.slides.all[vm.slides.current]);
		});

		function viewingLehmanMilletSite() {
			$rootScope.$broadcast('video:remove');
		}
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

})();
