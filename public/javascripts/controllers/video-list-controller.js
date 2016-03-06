App.controller('VideoListController', ['$scope', function($scope) {
    $scope.foo = 'bar';
    $scope.banner = '/images/banners/warcraft.png';
    $scope.videos = [
        {
            title: 'Warcraft (2016)',
            frames: [
                {
                    img: '',
                    timestamp: '1:20'
                }
            ]
        },
        {
            title: 'Mr Robot (2015)',
            frames: [
                {
                    img: '',
                    timestamp: '1:20'
                }
            ]
        }
    ];
}]);