App.controller('VideoListController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/videos').success(function(data) {
        $scope.videos = data;
    });
}]);