
var App = angular.
    module('hypeApp', ['ngRoute']).
    config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/videos', {
                templateUrl: 'partials/video-list.html',
                controller: 'VideoListController'
            }).
            when('/tv', {
                templateUrl: 'partials/video.html',
                controller: 'VideoController'
            }).
            when('/doodle', {
                templateUrl: 'partials/doodle.html',
                controller: 'DoodleController'
            }).
            otherwise({
                redirectTo: '/videos'
            });
    }])
    .run(function($rootScope, $window) {
         $rootScope.pageYOffset = 0;
         angular.element($window).bind('scroll', function() {
            $rootScope.pageYOffset = this.pageYOffset;
            $rootScope.$apply('pageYOffset');
         });
    });