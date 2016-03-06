
var App = angular.
    module('hypeApp', ['ngRoute']).
    config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
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
            when('/memes', {
                templateUrl: 'partials/meme-list.html',
                controller: 'MemeListController'
            }).
            when('/memes/:id', {
                templateUrl: 'partials/meme.html',
                controller: 'MemeController'
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