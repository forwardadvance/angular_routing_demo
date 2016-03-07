// Include ngRoute
// Use a config block to configure services
// Use $routeProvider.when(url, {}) to add routes
// specify a templateUrl to use a template
// ng-view outputs the template
// specify a controller - 2 ways
// HASHBANG URLS -  $locationProvider.hashPrefix('!');
// enable Pushstate - $locationProvider.html5Mode(true);
// passing route params
// Getting $routeParams in controller
// Outputting Route Params in the template

angular.module('app', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/home', {
      templateUrl: 'home.html'
    })
    $routeProvider.when('/about/:id', {
      templateUrl: 'about.html',
      controller: function($routeParams, $scope) {
        $scope.id = $routeParams.id
        pageService.get($scope.id)
          .then(funciton(data) {
            $scope.thing = data;
          })
        })
      }
    })
  })
















// final state
// myApp.config(function($routeProvider) {
  // .config(function($routeProvider, $locationProvider) {
  //   $locationProvider.html5Mode(true);
  //   $routeProvider.when('/home/:id', {
  //     templateUrl: '/home.html',
  //     controller: function($scope, $routeParams) {
  //       $scope.id = $routeParams.id
  //       $scope.article = Article.get({id:$routeParams.id})
  //     }
  //   });
  //    $routeProvider.when('/about', {
  //     templateUrl: '/about.html'
  //   });
  // })
