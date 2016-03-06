App.controller('VideoController', ['$scope', '$sce', '$timeout', function($scope, $sce, $timeout) {
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
    
    $scope.watch = function(videoSource) {
        $timeout(function() {
            $scope.currentvideo = videoSource;
        });
    };
    
    $scope.emoji = '😄';
    $scope.emojiVisible = false;
    
    $scope.toggleEmoji = function(emotion) {
        var emoji = '😄';
        if (emotion == 0) {
            emoji = '😌';
        }
        else if (emotion == '-1') {
            emoji = '😡';
        }
        $timeout(function() {
            $scope.emoji = emoji;
            $scope.emojiVisible = true;
        });
        
        $timeout(function() {
            $scope.emojiVisible = false;
        }, 2000);
    };
}]);