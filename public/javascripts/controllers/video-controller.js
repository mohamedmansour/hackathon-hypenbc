App.controller('VideoController', ['$scope', '$sce', '$timeout', function($scope, $sce, $timeout) {
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
    
    $scope.watch = function(videoSource) {
        $timeout(function() {
            $scope.currentvideo = videoSource;
        });
    };
}]);