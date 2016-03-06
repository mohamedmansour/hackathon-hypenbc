App.controller('MemeListController', ['$scope', '$http',  function($scope, $http) {
    $http.get('/api/memes').success(function(data) {
        $scope.videos = data;
    });
}]);