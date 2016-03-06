App.controller('MemeListController', ['$scope', '$http',  function($scope, $http) {
    $http.get('/api/meme').success(function(data) {
        $scope.memes = data;
    });
}]);