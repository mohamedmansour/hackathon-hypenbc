App.controller('MemeController', ['$scope', '$http', '$routeParams',  function($scope, $http, $routeParams) {
    $http.get('/api/meme/' + $routeParams.id).success(function(data) {
        $scope.meme = data;
    });
}]);