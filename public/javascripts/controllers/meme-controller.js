App.controller('MemeController', ['$scope', '$http', '$routeParams', '$location',  function($scope, $http, $routeParams, $location) {
    $http.get('/api/meme/' + $routeParams.id).success(function(data) {
        $scope.meme = data;
        $scope.tweetUrl = $location.protocol() + '://' + $location.host() + data.MemeUrl;
    });
}]);