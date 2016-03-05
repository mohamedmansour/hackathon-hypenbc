
var App = angular.
    module('hypeApp', ['ngRoute']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/videos', {
                templateUrl: 'partials/video-list.html',
                controller: 'VideoListController'
            }).
            otherwise({
                redirectTo: '/videos'
            });
    }]);