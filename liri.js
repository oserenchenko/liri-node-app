//setting up all global variables, keys, tokens, and npm's
require("dotenv").config();
var request = require("request");
var fs = require("fs");
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];

// ----------------------Functions for Commands----------------------------------------
//Twitter Function: gets the last 20 tweets from my Twitter account
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

//Spotify Function: looks up the song, artist, album, and link for the song specified by user
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

//OMDB Function: looks up the name, year, rating, country, language, plot, and actors for the movie specified by user
function movieGet(movieChoice) {
  request("http://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Movie: ' + JSON.parse(body).Title);
      console.log('Year: ' + JSON.parse(body).Year);
      console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
      console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
      console.log('Country: ' + JSON.parse(body).Country);
      console.log('Language: ' + JSON.parse(body).Language);
      console.log('Plot: ' + JSON.parse(body).Plot);
      console.log('Actors: ' + JSON.parse(body).Actors);
    } else {
      console.log(error);
    }
  });
};

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
  var movie = process.argv[3];
  if (movie) {
    movieGet(movie);
  } else {
    var defaultMovie = "Mr. Nobody";
    movieGet(defaultMovie);
  }
} else if (command === `do-what-it-says`) {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    } else {
      var dataArr = data.split(",");
      var whatToDo = dataArr[0];
      var details = dataArr[1];
      if (whatToDo === `my-tweets`) {
        twitterGet();
      } else if (whatToDo === `spotify-this-song`) {
        spotifyGet(details);
      } else if (whatToDo === `movie-this`) {
        movieGet(details);
      } else {
        console.log("That is not a command that I know, sorry!")
      }
    }
  });
} else {
  console.log("That is not a command that I know, sorry!")
};