App.controller('VideoListController', ['$scope', function($scope) {
    $scope.foo = 'bar';
    $scope.videos = [
        {
            title: "Warcraft (2016)",
            bannerImage: "/images/banners/warcraft.png",
            runtime: 7200,
            hypes: [
                {
                    thumbnail: '/images/frames/frame1.png',
                    timestamp: '1:20',
                    timemark: '1:20'
                },
                {
                    thumbnail: '/images/frames/frame3.png',
                    timestamp: '3:20',
                    timemark: '3:20'
                }
            ]
        },
        {
            title: "Mr Robot (2015)",
            subtitle: "Season 1, Episode 5",
            bannerImage: "/images/banners/warcraft.png",
            runtime: 3600,
            hypes: [
                {
                    thumbnail: '/images/frames/frame1.png',
                    timestamp: '1:20',
                    timemark: '1:20'
                },
                {
                    thumbnail: '/images/frames/frame2.png',
                    timestamp: '5:20',
                    timemark: '5:20'
                },
                {
                    thumbnail: '/images/frames/frame3.png',
                    timestamp: '10:20',
                    timemark: '10:20'
                }
            ]
        }
    ];
}]);