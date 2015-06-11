var app = angular.module('app', [
  'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider) {

  // Routing
  $routeProvider
      .when('/stats', {
        templateUrl: 'stats.html',
        controller: 'StatsCtrl'
      })
      .otherwise({
        redirectTo: '/stats'
      });
  }]);

app.run(['$rootScope', '$timeout', function($rootScope, $timeout) {

    console.log('wiring up ipc in ng');

    // Event registration
    require('ipc').on('workout-completed-event', function() {
        console.log('recieved workout-completed-event in nested webview process, rebroadcasting via ng broadcast');

        $timeout(function() {
          $rootScope.$broadcast('workout-completed-event')
        });
    });
}]);

app.controller('StatsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

	var vm = this;
	vm.workoutsCompleted = 0;

  var unbind = $rootScope.$on('workout-completed-event', function(){
    console.log('recieved workout-completed-event broadcast');
    vm.workoutsCompleted++;
  });

  $scope.$on('$destroy', unbind);

}]);



