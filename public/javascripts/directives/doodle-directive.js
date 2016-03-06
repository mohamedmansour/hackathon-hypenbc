App.directive('doodleFullscreen', ['$window', function($window) {

    function link(scope, element, attrs) {
        var boxWidth = $window.innerWidth;
        var boxHeight = $window.innerHeight - 175;
        var elt = element[0];
        elt.width = boxWidth;
        elt.height = boxHeight;
    }

    return {
        link: link
    }
}]);