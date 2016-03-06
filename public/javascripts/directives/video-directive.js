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
    
    socket.on('captureRequest', function (data) {
        console.log('Received a capture request with data: ', data);
       
        scope.toggleEmoji(data.emotion);
        
        var response = hypeMoment();
        socket.emit('captureResponse', response);
        
        console.log('Emitted captureResponse: ', response);
    });
    
    socket.on('watchRequest', function(data) {
        console.log('Received a watch request with data: ', data);
        watchVideo(data);
    });
    
    watchVideo('warcraft');
    
    function watchVideo(video) {
        if (video == 'warcraft') {
            scope.watch('https://s3-us-west-2.amazonaws.com/zoo42/warcraft.mp4');
        }
        else {
            scope.watch('https://s3-us-west-2.amazonaws.com/zoo42/mrrobots01e01.mp4');
        }
    }
    
    function hypeMoment() {
        console.log("Capturing the video");
        var videoDuration = elt.duration;
        var videoElapsed = elt.currentTime;

        context.drawImage(elt, 0, 0, canvas.width, canvas.height);
        
        var videoTitle = elt.src.substring(elt.src.lastIndexOf('/')+1).split('.')[0];
        console.log(videoTitle);
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


