App.controller('VideoController', ['$scope', '$sce', function($scope, $sce) {
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
  
    $scope.currentvideo = 'https://s3-us-west-2.amazonaws.com/zoo42/warcraft.mp4';
    
    $scope.changeVideo = function(videoSource) {
        $scope.currentvideo = videoSource;
    };
}]);