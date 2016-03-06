App.directive('videoFullscreen', ['$window', function($window) {

    function link(scope, element, attrs) {
        var boxWidth = $window.innerWidth;
        var boxHeight = $window.innerHeight;
        var elt = element[0];
        elt.width = boxWidth;
        elt.height = boxHeight;
     }
     
    return {
        link: link
    }
}]);

App.directive('videoTimeUpdate', [function() {
  function link(scope, element, attrs) {
    var elt = element[0];
    var canvas = angular.element('<canvas>')
        .attr('width', elt.clientWidth)
        .attr('height', elt.clientHeight)[0];
    var context = canvas.getContext('2d');
    var socket = io();
    var videoTitle = elt.src.split('.')[0].replace('/','');
    
    socket.on('captureRequest', function (data) {
        console.log('Received a capture request with data: ', data);
        
        var response = hypeMoment();
        socket.emit('captureResponse', response);
        
        console.log('Emitted captureResponse: ', response);
    });
    
    function hypeMoment() {
        console.log("Capturing the video");
        var videoDuration = elt.duration;
        var videoElapsed = elt.currentTime;

        context.drawImage(elt, 0, 0, canvas.width, canvas.height);
        
        var imageBase64Data = canvas.toDataURL('image/jpeg', 0.5);
        
        return { 
            image: imageBase64Data.substring(23), 
            videoDuration: videoDuration, 
            videoElapsed: videoElapsed, 
            videoTitle: videoTitle
        };
    };
  }
  
  return {
      link: link
  }
}]);


