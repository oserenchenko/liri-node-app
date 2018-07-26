require("dotenv").config();

var keys = require('./keys.js');
// var Spotify = require('spotify');
var Twitter = require('twitter');
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];


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
}

if (command === `my-tweets`) {
  twitterGet();
} else if (command === `spotify-this-song`) {

} else if (command === `movie-this`) {

} else if (command === `do-what-it-says`) {

} else {
  console.log("That is not a command that I know, sorry!")
};