# hypenbc
NBC Bay Area Hackathon

We created an Amazon Echo hack where we say "Alexa, watch with me", and Alexa will watch TV with you and your friends.
It will record the reactions of your friends and yourself. It figures out the sentiment of the reactions, and renders
on the screen emotions (sad face, happy face, neutral face) in real-time. Later on, you can view your captured moments,
doodle on it, and share them on Twitter/etc as memes.

# quick and dirty
 - The way we approached the solution, was simply having a bunch of keywords, when Alexa hears those keywords, it will
send a request to the our REST endpoint.
 - We created a TV Streamer Mock, so when the user visits that page, it registers himself to the that hub via WebSockets. 
 We want sockets because the TV Emulator that we created needs to display in real-time the sentiment. The exact moment
 really matters so all your friends who are watching together can see your reaction.
 - When a request from Alex arrives, we store the metadata in the NOSQL MongoDB table, and store the binary image in the
 IBM Blob Storage BlueMixDB. Then we broadcast the sentiment to all viewers.
 - Then we allow the user to doodle on image, and send it to their friends. 
 
 # technology
 We used sponsors tech since they organized the hackathon.
 - IBM Services - MongoDB for NoSQL, and BlueMixDB for Blob Storage
 - WebSockets from Socket.IO
 - Node.js for web backend
 - Angular.js for frontend
 
 # delegation
  - 1 person on Meme Generator 
  - 2 people on the backend RESTful APIs and infrastructure
  - 1 person on the frontend with Angular.JS, integration Node.js, Alexa integration
