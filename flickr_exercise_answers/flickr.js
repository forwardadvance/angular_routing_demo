(function() {

  angular.module('flickr', [])
    .constant('flickrBase', 'http://api.flickr.com/services/feeds/photos_public.gne')
    .directive('flickr', function() {
      var directive = {
        template: template,
        controller: Controller,
        restrict: "E",
        scope: {
          tag: '='
        }
      }
      return directive;
    })
    .service("flickrService", Service);

  function Service($http, flickrBase) {
    this.getByTag = function(tag) {
      var url = [
        flickrBase,
        '?tags=',
        tag,
        '&tagmode=any&format=json',
        '&jsoncallback=JSON_CALLBACK'
      ].join('');
      return $http.jsonp(url)
        .then(function(response) {
          return response.data.items;
        });
    };
  }

  function Controller($scope, flickrService) {
    var showSpinner = function() {
      $scope.spinner = true;
    }
    var hideSpinner = function() {
      $scope.spinner = false;
    }
    var showError = function() {
      $scope.error = true;
    }
    showSpinner();
    $scope.get = function() {
      if ($scope.tag) {
        flickrService.getByTag($scope.tag)
          .then(function(data) {
            $scope.feed = data;
          })
          .catch(showError)
          .then(hideSpinner);
      }
    }
    $scope.$watch('tag', $scope.get);
  };

  var template = `
    <ul>
      <li ng-repeat="item in feed">
        <a href="{{item.link}}">
          <img ng-src="{{item.media.m}}" />
        </a>
      </li>
    </ul>
  `

})();
