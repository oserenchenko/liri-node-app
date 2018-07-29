require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];

// ----------------------Functions for Commands----------------------------------------
function twitterGet() {
  var params = {
    screen_name: 'nodejs'
  };
  client.get('statuses/home_timeline', params, function (error, tweets, response) {
    if (error) {
      console.log(error);
    }
    for (var i = 0; i < tweets.length; i++) {
      var num = i + 1;
      var date = tweets[i].created_at;
      var dateSplit = date.split(' ');
      console.log('Tweet #' + num);
      console.log('\t' + 'Tweet: ' + tweets[i].text);
      console.log('\t' + 'Created: ' + dateSplit[0] + ' ' + dateSplit[1] + ' ' + dateSplit[2] + ' ' + dateSplit[3]);
    }
  });
};

function spotifyGet(music) {
  spotify.search({
    type: 'track',
    query: music
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var songObj = data.tracks.items[0];
    console.log('Song: ' + songObj.name);
    console.log('Artist: ' + songObj.album.artists[0].name);
    console.log('Album: ' + songObj.album.name);
    console.log('Spotify Link: ' + songObj.external_urls.spotify);
  });
};


// spotifyGet('Helter Skelter');


// ----------------------runs LIRI----------------------------------------
if (command === `my-tweets`) {
  twitterGet();
} else if (command === `spotify-this-song`) {
  var song = process.argv[3];
  if (song) {
    spotifyGet(song);
  } else {
    var defaultSong = "The Sign";
    spotifyGet(defaultSong);
  }
} else if (command === `movie-this`) {

} else if (command === `do-what-it-says`) {

} else {
  console.log("That is not a command that I know, sorry!")
};