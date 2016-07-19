angular.module('app', ['ngRoute', 'flickr'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/flickr/:tag', {
      templateUrl: 'flickr.html',
      controller: function($routeParams, $scope) {
        $scope.tag = $routeParams.tag
      }
    })
  })
