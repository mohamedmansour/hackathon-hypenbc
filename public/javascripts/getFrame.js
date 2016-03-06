var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var button = document.getElementById('button');
var image = document.getElementById('img');
canvas.setAttribute('width', video.clientWidth.toString());
canvas.setAttribute('height', video.clientHeight.toString());
image.setAttribute('width', video.clientWidth.toString());
image.setAttribute('height', video.clientHeight.toString());

var context = canvas.getContext('2d');

// connect to the socket
var socket = io.connect();

socket.on('captureRequest', function (data) {
  console.log("Received a capture request with data: " + data);
  socket.emit('captureResponse', capture_screen())
});

button.addEventListener('click', function(event){
  console.log("button clicked... setting img tag");
  capture_screen();
});

var capture_screen = function() {
  console.log("Capturing the video");
  var videoDuration = video.duration;
  var videoElapsed = video.currentTime;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  var imageBase64Data = canvas.toDataURL('image/jpeg', 0.5);
  image.setAttribute('src', imageBase64Data);
  
  return { image: imageBase64Data.substring(23), videoDuration: videoDuration, videoElapsed: videoElapsed }
}
